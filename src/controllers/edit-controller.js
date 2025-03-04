const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Video = require('../service/edit-service.js');
const { emit } = require('process');

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

module.exports.uploadVideos = upload.array('files');

module.exports.receiveVideos = async (req, res, next) => {
    const videoService = new Video();

    let videoPaths = [];
    try {

        console.log(JSON.parse(req.body.data))

        if (!req.body.data) {
            return res.status(400).json({ message: 'No data field found in request.' });
        }

        const { emails, subtitle, videos: videoInfo } = JSON.parse(req.body.data);

        if (!emails) {
            return res.status(400).json({ message: '편집된 영상의 제목과 영상을 받을 이메일이 필요합니다.' });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: '최소 하나 이상의 동영상이 필요합니다.' });
        }

        videoPaths = req.files.map(file => file.path);

        const videos = await videoService.readFiles(videoPaths);
        
        videoService.sendFile(emails, videos, subtitle);

        res.status(200).json({ message: '편집이 시작되었습니다!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '파일 업로드 중 오류가 발생했습니다.' });

    } 
    // finally {
    //     await videoService.deleteFile(videoPaths);
    // }
};
