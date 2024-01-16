const streamifier = require("streamifier");
const fs = require("fs");
const crypto = require("crypto");
const { cloudinary } = require("../config");

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
        { resource_type: "video", chunk_size: 1024 * 1024 * 5 },
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
      reject({
        message: "Have error when upload video to cloudinary ",
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
  uploadFilesToCloudinary,
  readSslKey,
  writeSslKey,
  uploadVideoToCloudinary,
};
