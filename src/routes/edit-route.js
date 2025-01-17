const express = require("express");
const edit = require("../controllers/edit-controller.js");
const receive = require("../controllers/receive-controller.js");
const router = express.Router();

router.post("/upload", edit.uploadVideos, edit.receiveVideos);

// 전설의 사패 회피법
router.post("/wjstjf/receive", receive.receiveResultVideo);

// Serve test HTML directly from a GET route
router.get("/receive", (req, res) => {
    res.send(`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Video Upload Test</title>
                </head>
                <body>
                    <h1>Video Upload Test</h1>
                    <form id="uploadForm" action="/edit/wjstjf/receive" method="POST" enctype="multipart/form-data">
                        <label for="video">Select a video to upload:</label>
                        <input type="file" id="video" name="video" accept="video/*" required>
                        <button type="submit">Upload</button>
                    </form>

                    <h2>Upload Response</h2>
                    <pre id="response"></pre>

                    <script>
                        const form = document.getElementById('uploadForm');
                        const responseDisplay = document.getElementById('response');

                        form.addEventListener('submit', async (event) => {
                            event.preventDefault();

                            const formData = new FormData(form);

                            try {
                                const response = await fetch(form.action, {
                                    method: 'POST',
                                    body: formData
                                });

                                const result = await response.json();
                                responseDisplay.textContent = JSON.stringify(result, null, 2);
                            } catch (error) {
                                responseDisplay.textContent = "Error";
                            }
                        });
                    </script>
                </body>
                </html>`);
});

router.get("/download/:filename", (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, "../resultVideo", fileName);

    res.download(filePath, fileName, (err) => {
        if (err) {
            console.error("File download error:", err);
            res.status(404).send({ message: "File not found." });
        }
    });
});

module.exports = router;
