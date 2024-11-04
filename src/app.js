const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config({ path: __dirname + "/config/.env" });

const app = express();
const port = process.env.PORT;

const indexRouter = require("./routes/index-route.js");
const adminRouter = require("./routes/admin-route.js");
const editRouter = require("./routes/edit-route.js");


app.use(cors());
app.use(express.json());


app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/edit", editRouter);


app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log(`server running success http://localhost:${String(port)}`);
})