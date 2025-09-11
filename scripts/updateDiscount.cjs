const admin = require("firebase-admin");
const serviceAccount = require("./el-sokrya-firebase-adminsdk-fbsvc-9c435477e9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const collectionsToUpdate = ["watches", "straps"];

async function updateDiscountFields() {
  for (const collectionName of collectionsToUpdate) {
    console.log(`\n--- Processing collection: ${collectionName} ---`);
    let productsRef = db.collection(collectionName);
    let snapshot;

    try {
      snapshot = await productsRef.get();
    } catch (error) {
      console.error(`Error fetching documents from ${collectionName}:`, error);
      continue;
    }

    if (snapshot.empty) {
      console.log(`No documents found in ${collectionName}.`);
      continue;
    }

    const batch = db.batch();
    let updatesCount = 0;

    snapshot.docs.forEach((doc) => {
      const data = doc.data();

      if (data.discount && typeof data.discount === "object") {
        const discount = { ...data.discount };

        if (typeof discount.valid_until === "number" && !discount.expiresAt) {
          const durationDays = discount.valid_until;

          let referenceDate;
          if (data.createdAt instanceof admin.firestore.Timestamp) {
            referenceDate = data.createdAt.toDate();
          } else if (data.createdAt instanceof Date) {
            referenceDate = data.createdAt;
          } else {
            referenceDate = new Date();
            console.warn(
              `  Document ${doc.id} (Collection: ${collectionName}): No valid 'createdAt' found for discount expiry calculation. Using current date.`
            );
          }

          const expiryDate = new Date(referenceDate);
          expiryDate.setDate(expiryDate.getDate() + durationDays);

          discount.expiresAt = admin.firestore.Timestamp.fromDate(expiryDate);
          discount.duration_days = durationDays;
          delete discount.valid_until;

          batch.update(doc.ref, { discount: discount });
          updatesCount++;
          console.log(
            `  Document ${doc.id}: Updated discount (added expiresAt, renamed valid_until to duration_days).`
          );
        } else if (
          discount.discount_percentage === 0 &&
          (typeof discount.valid_until === "number" || !discount.expiresAt)
        ) {
          batch.update(doc.ref, {
            discount: admin.firestore.FieldValue.delete(),
          });
          updatesCount++;
          console.log(
            `  Document ${doc.id}: Removed discount field as discount percentage is 0.`
          );
        }
      }
    });

    if (updatesCount > 0) {
      console.log(
        `Committing batch for ${collectionName} with ${updatesCount} updates...`
      );
      await batch.commit();
      console.log(`Successfully committed batch for ${collectionName}.`);
    } else {
      console.log(`No updates needed for ${collectionName}.`);
    }
  }
  console.log("\n--- Discount field update script finished. ---");
}

updateDiscountFields().catch((error) => {
  console.error("Script encountered an error:", error);
});
