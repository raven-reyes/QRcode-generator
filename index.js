// Calling the packages that we need
const express = require("express");
const path = require('path');
const app = express();
const qr = require("qrcode");
// Using the ejs (Embedded JavaScript templates) as our template engine
app.set("view engine", "ejs");
// parse request to body-parser
app.use(express.json());
app.use(express.urlencoded({ extended : true}))
// Simple routing to the index.ejs file
app.get("/", (req, res) => {
    res.render("index");
});

// Blank input
// Incase of blank in the index.ejs file, return error 
// Error  - Empty Data!
app.post("/generate", (req, res) => {
    const password = req.body.password;

    if (password.length === 0) res.send("Empty Data!");
    qr.toDataURL(password, (err, src) => {
        if (err) res.send("Error occured");
    res.render("generate", { src });
    });
});
// Setting up the port for listening requests
app.listen(3000, () => console.log("app is listening on 3000"));