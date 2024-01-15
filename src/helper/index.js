const multer = require("multer");
const path = require("path");
const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const crypto = require("crypto");
const uploadImage = multer({
  storage: multer.memoryStorage({}),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
const uploadVideo = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_CLOUD_KEY,
  api_secret: process.env.API_CLOUD_SECRET,
  secure: true,
});
const uploadFilesToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    try {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      streamifier.createReadStream(file.buffer).pipe(stream);
    } catch (error) {
      console.log(error);
      reject({
        message: "Have error when upload image to cloudinary ",
      });
    }
  });
};

const uploadVideoToCloudinary = async (path) => {
  return new Promise((resolve, reject) => {
    try {
      cloudinary.uploader.upload_large(
        path,
        { resource_type: "video" },
        (err, result) => {
          if (err) {
            reject({
              message: "Have error when upload video to cloudinary ",
              status: false,
            });
          } else {
            resolve(result);
          }
        }
      );
    } catch (error) {
      console.log(error);
      reject({
        message: "Have error when upload image to cloudinary ",
      });
    }
  });
};

const readSslKey = async () => {
  const publicKey = await fs.readFileSync("./ssl/public.pem").toString();
  const privateKey = await fs.readFileSync("./ssl/private.pem").toString();
  return {
    publicKey,
    privateKey,
  };
};

const writeSslKey = async () => {
  const sslKey = await readSslKey();
  const { publicKey, privateKey } = sslKey;
  if (!publicKey || !privateKey) {
    const keypair = crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });
    fs.writeFileSync("./ssl/public.pem", keypair.publicKey);

    fs.writeFileSync("./ssl/private.pem", keypair.privateKey);
  }
};

module.exports = {
  uploadImage,
  uploadVideo,
  uploadFilesToCloudinary,
  readSslKey,
  writeSslKey,
  cloudinary,
  uploadVideoToCloudinary,
};
