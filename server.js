const express = require("express")
const https = require("https")
// const http = require("http")
const path = require("path")
const app = express()
const fs = require("fs")

app.use(express.static(path.join(__dirname, "dist")))
app.use(express.static(path.join(__dirname, "node_modules")))

const key = fs.readFileSync('../ssl/keys/ccb0d_a9353_108253f886f143dfc68bcdbd568ef758.key');
const cert = fs.readFileSync( '../ssl/certs/nechamayaffe_com_ccb0d_a9353_1587977797_7b05f21ce7d4f942432f3769f130df16.crt' );
const ca = fs.readFileSync('../ssl/certs/nechamayaffe_com_ccb0d_a9353_1587977797_7b05f21ce7d4f942432f3769f130df16.ca-bundle')
const options = {key: key, cert: cert, ca: ca};
https.createServer(options, app).listen(50080);

// app.listen(50080, function() {
//     console.log("server running on port 50080")
// })