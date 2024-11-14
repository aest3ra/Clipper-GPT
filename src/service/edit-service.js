const fs = require('fs').promises;

class Video {
    constructor() {}

    async convert2base64(videoPaths) {
        const base64Files = [];

        for (const videoPath of videoPaths) {
            try {
                const fileData = await fs.readFile(videoPath);
                const base64Encoded = fileData.toString('base64');
                
                const fileName = videoPath.split('/').pop();
                base64Files.push({ filename: fileName, data: base64Encoded });
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

    async sendFile(email, title, files) {
        const data = {
            files: files,
            email: email,
            title: title,
        };

        try {
            const response = await fetch('http://34.64.192.116:8000/files', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    }
} 

module.exports = Video;