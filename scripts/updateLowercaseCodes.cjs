const admin = require("firebase-admin");

const serviceAccount = require("./el-sokrya-firebase-adminsdk-fbsvc-9c435477e9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

/**
 * Updates documents in a specified collection to add the 'code_lowercase' field.
 * @param {string} collectionName
 */
const updateCollection = async (collectionName) => {
  console.log(`Starting update for collection: ${collectionName}`);
  const collectionRef = db.collection(collectionName);
  const snapshot = await collectionRef.get();

  if (snapshot.empty) {
    console.log(`No documents found in ${collectionName}.`);
    return;
  }

  const batch = db.batch();
  let count = 0;

  snapshot.docs.forEach((doc) => {
    const data = doc.data();

    if (data.code && !data.code_lowercase) {
      const docRef = doc.ref;
      const lowerCaseCode = data.code.toLowerCase();

      batch.update(docRef, { code_lowercase: lowerCaseCode });
      count++;
    }
  });

  if (count > 0) {
    console.log(
      `Committing batch update for ${count} documents in ${collectionName}...`
    );
    await batch.commit();
    console.log(
      `Successfully updated ${count} documents in ${collectionName}.`
    );
  } else {
    console.log(`No documents in ${collectionName} needed updating.`);
  }
};

const runMigration = async () => {
  try {
    await updateCollection("watches");

    console.log("All existing collections processed. Migration complete!");
  } catch (error) {
    console.error("Migration failed:", error);
  }
  process.exit();
};

runMigration();
