import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Foundation", // 👈 main folder
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: (req, file) =>
      `member_${Date.now()}`, // unique file name
  },
});

const upload = multer({ storage });

export default upload;
