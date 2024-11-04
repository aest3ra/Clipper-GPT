const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send(`
        <html>
            <center>
            <body>
                <br><br>
                <h3>This is Admin Page</h3>
                todo: <br>
                Log, Search, Something other else .....
            </body>
            </center>
        </html>
        `
    )
});

module.exports = router;