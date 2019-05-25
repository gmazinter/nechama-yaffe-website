const express = require("express")
const app = express()
const path = require("path")

app.use(express.static(path.join(__dirname, "dist")))
app.use(express.static(path.join(__dirname, "node_modules")))


app.get("/sanity", function(req, res) {
    res.send({ "you sane in the membrane": "asdsdaa" })
})

app.listen(8080, function() {
    console.log("server running on port 8080")
})