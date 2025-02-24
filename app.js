const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config({ path: __dirname + "/src/config/.env" });

const app = express();
const port = process.env.PORT | 8000;

const indexRouter = require("./src/routes/index-route.js");
const adminRouter = require("./src/routes/admin-route.js");
const editRouter = require("./src/routes/edit-route.js");
const resultRouter = require("./src/routes/result-route.js");

app.use(cors());
app.use(express.json({limit: '2000mb'}));
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/edit", editRouter);
app.use("/result", resultRouter);


app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log("**----------------------------------**");
    console.log("====      Server is On...!!!      ====");
    console.log("**----------------------------------**");
})