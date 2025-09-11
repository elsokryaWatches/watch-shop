import "dotenv/config";
import admin from "firebase-admin";
import { readFile } from "fs/promises";

async function resetAllWatchStock() {
  try {
    // Load your service account key
    const serviceAccount = JSON.parse(
      await readFile(
        new URL(
          "./el-sokrya-firebase-adminsdk-fbsvc-9c435477e9.json",
          import.meta.url
        )
      )
    );

    // Initialize Firebase Admin
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${process.env.VITE_FIREBASE_PROJECT_ID}.firebaseio.com`,
    });

    const db = admin.firestore();
    const watchesRef = db.collection("watches");
    const snapshot = await watchesRef.get();

    console.log(`Found ${snapshot.size} watches to update...`);

    if (snapshot.size === 0) {
      console.log("No watches found in collection");
      return;
    }

    // Use batched writes to update in batches of 500 (Firestore limit)
    let batch = db.batch();
    let count = 0;
    let batchCount = 0;

    // Convert to array first to avoid async issues in forEach
    const documents = snapshot.docs;

    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i];
      batch.update(doc.ref, {
        stock: 0,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      count++;

      // Commit every 500 operations (Firestore batch limit)
      if (count % 500 === 0) {
        batchCount++;
        console.log(`Committing batch ${batchCount}...`);
        await batch.commit();
        batch = db.batch();
      }
    }

    // Commit any remaining operations
    if (count % 500 !== 0) {
      await batch.commit();
    }

    console.log(`✅ Successfully reset stock to 0 for ${count} watches!`);
  } catch (error) {
    console.error("❌ Error resetting stock:", error);
  } finally {
    process.exit();
  }
}

// Run the function
resetAllWatchStock();
