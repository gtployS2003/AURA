const formDataValidator = (req, res, next) => {
  // ตรวจสอบว่ามีไฟล์ถูกอัปโหลดหรือไม่
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No files were uploaded."
    });
  }

  // ตรวจสอบว่า style ถูกส่งมาใน body หรือไม่
  if (!req.body.style) {
    return res.status(400).json({
      success: false,
      message: "No style is selected."
    });
  }

  // ถ้าผ่านการตรวจสอบทั้งหมด ให้เรียก next()
  next();
};

module.exports = { formDataValidator };