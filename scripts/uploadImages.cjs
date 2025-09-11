const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

const serviceAccount = require("./el-sokrya-firebase-adminsdk-fbsvc-9c435477e9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://el-sokrya.firebasestorage.app",
});

const bucket = admin.storage().bucket();

const uploadFolder = async (currentLocalPath, currentFirebasePath) => {
  try {
    const items = fs.readdirSync(currentLocalPath, { withFileTypes: true });

    for (const item of items) {
      const itemLocalPath = path.join(currentLocalPath, item.name);
      const itemFirebasePath = `${currentFirebasePath}/${item.name}`;

      if (item.isDirectory()) {
        console.log(`Entering directory: ${itemLocalPath}`);
        await uploadFolder(itemLocalPath, itemFirebasePath);
      } else if (item.isFile()) {
        if (item.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          console.log(`Uploading ${itemLocalPath} to ${itemFirebasePath}...`);
          await bucket.upload(itemLocalPath, {
            destination: itemFirebasePath,
            metadata: {
              cacheControl: "public, max-age=31536000",
            },
          });
          console.log(`${item.name} uploaded successfully!`);
        } else {
          console.log(`Skipping non-image file: ${itemLocalPath}`);
        }
      }
    }
  } catch (error) {
    console.error(`Failed to process path ${currentLocalPath}:`, error.message);
    if (error.code === "ENOENT") {
      console.error(
        `ERROR: Directory not found. Ensure the path is correct and you are running the script from the project root (D:\\ElSokrya).`
      );
    }
  }
};

const main = async () => {
  const localImageFolders = [
    { local: "./public/imgs/MiniFocus", remote: "images/MiniFocus" },
    { local: "./public/imgs/SKMEI", remote: "images/SKMEI" },
  ];

  for (const folder of localImageFolders) {
    console.log(
      `--- Starting upload for local path: ${folder.local} to Firebase path: ${folder.remote} ---`
    );
    await uploadFolder(folder.local, folder.remote);
    console.log(`--- Finished upload for local path: ${folder.local} ---`);
  }

  console.log("All specified image folders processed.");
  process.exit();
};

main();
