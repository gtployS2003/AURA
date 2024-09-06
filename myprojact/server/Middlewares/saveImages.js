import fs from "fs";
import path from "path";

const saveImages = (req, res, next) => {
  const messages = [];
  const uploadDir = path.join(__dirname, "../uploads");

  // ตรวจสอบว่าโฟลเดอร์ uploads มีอยู่หรือไม่ ถ้าไม่มีก็สร้างใหม่
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // ใช้ asynchronous fs.writeFile แทน fs.writeFileSync
  const saveFilePromises = Object.keys(req.files).map((key) => {
    const file = req.files[key];
    const filePath = path.join(
      uploadDir,
      `${key}.${file.mimetype.split("/")[1]}`
    );

    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, file.data, (err) => {
        if (err) {
          messages.push(`Error saving ${key}: ${err.message}`);
          return reject(err);
        }
        messages.push(`${key} saved as an image file.`);
        resolve();
      });
    });
  });

  // รอให้การบันทึกไฟล์ทั้งหมดเสร็จสิ้น
  Promise.all(saveFilePromises)
    .then(() => {
      // ไม่มีข้อผิดพลาด
      next();
    })
    .catch((error) => {
      // หากมีข้อผิดพลาดในการบันทึกไฟล์
      res.status(500).send(messages.join("\n"));
    });
};

module.exports = { saveImages };
