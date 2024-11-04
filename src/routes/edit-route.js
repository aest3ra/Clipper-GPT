const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("edit page")
});

module.exports = router;