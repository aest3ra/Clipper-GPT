const fs = require('fs').promises;

class Video {
    constructor() {}

    async convert2base64(videoPaths) {
        const base64Files = {};

        for (const videoPath of videoPaths) {
            try {
                const fileData = await fs.readFile(videoPath);
                const base64Encoded = fileData.toString('base64');
                
                const fileName = videoPath.split('/').pop(); // Get the file name from the path
                base64Files[fileName] = base64Encoded;
            } catch (error) {
                console.error(`Error encoding file ${videoPath}:`, error);
            }
        }

        return base64Files;
    }

    async deleteFile(videoPaths) {
        for (const videoPath of videoPaths) {
            try {
                await fs.unlink(videoPath);
                console.log(`Deleted file: ${videoPath}`);
            } catch (error) {
                console.error(`Error deleting file ${videoPath}:`, error);
            }
        }
    }
} 

module.exports = Video;