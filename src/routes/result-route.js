const express = require("express");
const receive = require("../controllers/receive-controller.js");
const router = express.Router();

router.post("/getEditedVideo", receive.receiveResultZip);
router.get("/download/:filename", receive.downloadResultFile);

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
                    <form id="uploadForm" action="/result/getEditedVideo" method="POST" enctype="multipart/form-data">
                        <label for="video">Select a video to upload:</label>
                        <input type="file" id="zip" name="zip" accept="zip/*" required>
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


module.exports = router;
