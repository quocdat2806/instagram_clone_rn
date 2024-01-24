const streamifier = require("streamifier");
const fs = require("fs");
const crypto = require("crypto");
const { configCloudinary } = require("../config");
const uploadFilesToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    try {
      let stream = configCloudinary.uploader.upload_stream((error, result) => {
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
      configCloudinary.uploader.upload_large(
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

const readSslKey = () => {
  const publicKey = fs.readFileSync("../server/src/ssl/public.pem").toString();
  const privateKey = fs
    .readFileSync("../server/src/ssl/private.pem")
    .toString();
  return {
    publicKey,
    privateKey,
  };
};

const writeSslKey = async () => {
  const sslKey = readSslKey();
  const { publicKey, privateKey } = sslKey;
  if (!publicKey || !privateKey) {
    const keyPair = crypto.generateKeyPairSync("rsa", {
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
    fs.writeFileSync("../server/src/ssl/public.pem", keyPair.publicKey);

    fs.writeFileSync("../server/src/ssl/private.pem", keyPair.privateKey);
  }
};

module.exports = {
  uploadFilesToCloudinary,
  readSslKey,
  writeSslKey,
  uploadVideoToCloudinary,
};
