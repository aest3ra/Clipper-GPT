const fs = require("fs");
const path = require("path");
const multer = require("multer");

const uploadDirectory = path.join(__dirname, "../../resultVideo");
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 700 * 1024 * 1024 },
});


module.exports.receiveResultZip = async (req, res, next) => {

    upload.single("zip")(req, res, (err) => {
        if (err) {
            console.error("Error in file upload middleware:", err);
            return next(err);
        }
        try {
            if (!req.file) { return res.status(400).json({ message: "No file uploaded." });}
            
            res.status(200).json({
                message: "File uploaded successfully.",
                filePath: "https://clippergpt.com/api/edit/download/" + req.file.filename,
            });
        } catch (error) {
            console.error("Error handling file upload:", error);
            res.status(500).json({ message: "Internal server error." });
        }
    });
};
