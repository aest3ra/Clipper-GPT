const fs = require('fs').promises;
const path = require('path');
const FormData = require('form-data');
const { v4: uuidv4 } = require('uuid');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

class Video {
    constructor() {}

    async readFiles(videoPaths) {
        const filesData = [];
        for (const videoPath of videoPaths) {
            try {
                const fileData = await fs.readFile(videoPath);
                const fileName = path.basename(videoPath); 
                filesData.push({ filename: fileName, data: fileData });
            } catch (error) {
                console.error(`Error reading file ${videoPath}:`, error);
            }
        }
        return filesData;
    }

    async sendFile(emails, videos, subtitle) {
        const formData = new FormData();
        formData.append('emails', JSON.stringify(emails))
        formData.append('subtitle', subtitle);
        formData.append('reqId', uuidv4());
      
        videos.forEach((video, i) => {
            formData.append('videos', video.data, { filename: video.filename });
        });

        console.log('formData emails : ', formData._streams);

        try {
            await fetch('http://34.64.57.87:8000/files', {
                method: 'POST',
                body: formData
            });
        } catch {
            console.log("Error while sending Data to AI server")
        }
        
    
        console.log('Files sent successfully');
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