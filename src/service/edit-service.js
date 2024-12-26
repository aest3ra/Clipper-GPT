const fs = require('fs').promises;
const FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

class Video {
    constructor() {}

    async readFiles(videoPaths) {
        const filesData = [];
        for (const videoPath of videoPaths) {
            try {
                const fileData = await fs.readFile(videoPath);
                const fileName = videoPath.split('/').pop();
                filesData.push({ filename: fileName, data: fileData });
            } catch (error) {
                console.error(`Error reading file ${videoPath}:`, error);
            }
        }
        return filesData;
    }

    async sendFile(emails, videos) {
        const formData = new FormData();
        formData.append('emails', emails);
      
        videos.forEach((video) => {
          formData.append('videos', video.data, { filename: video.filename });
        });
      
        console.log("formData emails : ", formData._streams);
    

        // try {
        //     const response = await fetch('http://34.64.192.116:8000/files', {
        //         method: 'POST',
        //         body: formData
        //     });

        //     if (!response.ok) {
        //         const text = await response.text();
        //         throw new Error(`Network response was not ok: ${text}`);
        //     }

        //     console.log('Files sent successfully');
        // } catch (error) {
        //     console.error("Error during fetch:", error);
        // }
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