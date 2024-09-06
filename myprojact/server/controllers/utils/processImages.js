import sharp from "sharp";
import fs from "fs";
import path from "path";

// Function to reduce image size/quality and convert to Base64
async function convertImageToBase64(filePath) {
  try {
    // Reduce the size or quality here
    const buffer = await sharp(filePath)
      .resize({ width: 100 }) // Resize to 100 pixels in width, keeping aspect ratio
      .jpeg({ quality: 50 }) // Convert to JPEG with 50% quality
      .toBuffer();

    // Convert to Base64
    const base64 = `data:image/jpg;base64,${buffer.toString("base64")}`;
    return base64;
  } catch (error) {
    console.error("Error processing image:", error);
    throw new Error("Failed to convert image to Base64.");
  }
}

// Helper function to process images
const processImages = async (req) => {
  const uploadsDir = path.join(__dirname, "../../uploads");
  const imageUrls = [];

  // Ensure the uploads directory exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Process each file in req.files
  for (const key of Object.keys(req.files || {})) {
    const file = req.files[key];
    const fileExtension = file.mimetype.split("/")[1];
    const fullFilePath = path.join(uploadsDir, `${key}.${fileExtension}`);

    try {
      // Save the uploaded file to disk
      await file.mv(fullFilePath);

      // Convert saved image to Base64
      const base64Image = await convertImageToBase64(fullFilePath);
      console.log(`Loaded and encoded image for ${key}`);
      imageUrls.push(base64Image);
    } catch (err) {
      console.error(`Error processing image for ${key}: ${err.message}`);
    }
  }

  return imageUrls;
};

module.exports = { processImages };
