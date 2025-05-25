const admin = require("firebase-admin");
const serviceAccount = require("./el-sokrya-firebase-adminsdk-fbsvc-9c435477e9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const updateImagePathsInFirestore = async () => {
  const collectionRef = db.collection("watches");

  try {
    const snapshot = await collectionRef.get();

    if (snapshot.empty) {
      console.log(
        'No documents found in the "watches" collection. Skipping update.'
      );
      return;
    }

    const updates = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      const docId = doc.id;

      if (data.images && Array.isArray(data.images)) {
        const newImagePaths = data.images.map((oldPath) => {
          if (oldPath.startsWith("/imgs/")) {
            return `images/${oldPath.substring(6)}`;
          }

          return oldPath;
        });

        if (JSON.stringify(newImagePaths) !== JSON.stringify(data.images)) {
          updates.push({
            docRef: collectionRef.doc(docId),
            data: { images: newImagePaths },
          });
        }
      }
    });

    if (updates.length > 0) {
      const batch = db.batch();
      updates.forEach((update) => {
        batch.update(update.docRef, update.data);
      });
      await batch.commit();
      console.log(
        `Successfully updated ${updates.length} documents in Firestore.`
      );
    } else {
      console.log(
        "No image paths needed updating in Firestore, or no changes were found."
      );
    }
  } catch (error) {
    console.error("Error updating Firestore documents:", error);
  }
};

updateImagePathsInFirestore()
  .then(() => {
    console.log("Firestore image path update script finished.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  });
