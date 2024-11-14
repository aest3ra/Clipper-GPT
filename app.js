const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config({ path: __dirname + "/src/config/.env" });

const app = express();
const port = process.env.PORT | 8000;

const indexRouter = require("./src/routes/index-route.js");
const adminRouter = require("./src/routes/admin-route.js");
const editRouter = require("./src/routes/edit-route.js");

app.use(cors());
app.use(express.json({limit: '500mb'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/edit", editRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log(`server running http://localhost:${String(port)}`);
})