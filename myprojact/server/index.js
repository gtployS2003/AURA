import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import path from "path";
import clothesRoutes from "./routes/clothes.js";
import outfitsRoutes from "./routes/outfits.js";

const app = express();
const port = 3001; // fallback to port 3000 if not set in .env

app.use(cors());
app.use(fileUpload({ limits: { fileSize: 10 * 1024 * 1024 } })); // file size limit 10MB
app.use(express.json({ limit: "1mb" }));

// Serve static files from the public folder
app.use("/public", express.static(path.join(__dirname, "../client/public")));

// Define routes (remove full URLs, only use paths)
app.use("/api/clothes", clothesRoutes);
app.use("/api/outfits", outfitsRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
