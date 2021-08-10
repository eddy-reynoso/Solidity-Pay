let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
const path = require("path");
require("dotenv").config();

let app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("build"));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen(port, function() {
    console.log("Listening on port", port);
});
