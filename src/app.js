const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config({ path: __dirname + "/config/.env" });

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());


app.get('/test', (req, res) => {
    console.log("test")
    res.json({
        success: true,
    });
});


app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log(`server running success http://localhost:${String(port)}`);
})