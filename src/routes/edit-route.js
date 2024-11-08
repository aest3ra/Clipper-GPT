const express = require("express");
const edit = require("../controllers/edit-controller.js");

const router = express.Router();


router.post("/upload", edit.uploadVideos, edit.receiveVideos);

// router.get("/", (req, res) => {
//     res.send(`
//        <!DOCTYPE html>
//        <html lang="ko">
//        <head>
//            <meta charset="UTF-8">
//            <meta name="viewport" content="width=device-width, initial-scale=1.0">
//            <title>Video Upload Test</title>
//        </head>
//        <body>

//        <h2>Video Upload Form</h2>
//        <form id="uploadForm">
//            <label for="email">Email:</label>
//            <input type="email" id="email" name="email" required>
//            <br><br>

//            <label for="title">Title:</label>
//            <input type="text" id="title" name="title" required>
//            <br><br>

//            <label for="videos">Upload Videos:</label>
//            <input type="file" id="videos" name="videos" accept="video/*" multiple required>
//            <br><br>

//            <button type="button" onclick="uploadVideos()">Upload</button>
//        </form>

//        <script>
//            async function uploadVideos() {
//                const form = document.getElementById("uploadForm");
//                const formData = new FormData(form);


//                for (let [key, value] of formData.entries()) {
//                    console.log(key, value);
//                }


//                try {
//                    const response = await fetch("/edit/upload", {
//                        method: "POST",
//                        body: formData
//                    });

//                    const result = await response.json();
//                    alert(result.message);
//                } catch (error) {
//                    console.error("Error uploading videos:", error);
//                    alert("파일 업로드 중 오류가 발생했습니다.");
//                }
//            }
//        </script>

//        </body>
//        </html>
//     `);
// });

module.exports = router;