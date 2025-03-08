const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "recipes", // ✅ Cloudinary folder name
    format: async (req, file) => "png", // ✅ Converts to PNG (or change to file format)
    public_id: (req, file) => file.originalname.split(".")[0], // ✅ Uses filename without extension
  },
});

const upload = multer({ storage });

module.exports = upload;
