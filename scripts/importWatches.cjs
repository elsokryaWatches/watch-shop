const admin = require("firebase-admin");
const serviceAccount = require("./el-sokrya-firebase-adminsdk-fbsvc-97470f05cf.json");

const SKMEI = require("../public/API/SKMEI.json");
const MiniFocus = require("../public/API/MiniFocus.json");
const IBSO = require("../public/API/IBSO.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function importData() {
  const collectionsToImport = [
    { name: "watches", data: SKMEI.watches },
    { name: "watches", data: MiniFocus.watches },
    { name: "watches", data: IBSO.watches },
  ];

  for (const collectionItem of collectionsToImport) {
    const collectionRef = db.collection(collectionItem.name);
    if (collectionItem.data && collectionItem.data.length > 0) {
      console.log(
        `Starting import for ${collectionItem.data.length} documents into collection: ${collectionItem.name}`
      );
      for (const docData of collectionItem.data) {
        try {
          await collectionRef.add(docData);
          console.log(`Added document with code: ${docData.code || "N/A"}`);
        } catch (error) {
          console.error(
            `Error adding document (code: ${docData.code || "N/A"}):`,
            error
          );
        }
      }
      console.log(
        `Finished importing documents into collection: ${collectionItem.name}`
      );
    } else {
      console.log(
        `No data to import for collection: ${collectionItem.name}. (JSON file might be empty or missing 'watches' array)`
      );
    }
  }
  console.log("All imports attempted.");
  process.exit();
}

importData().catch(console.error);
