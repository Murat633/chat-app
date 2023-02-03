const express = require("express");
const socket = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS
const server = app.listen(3000);

app.get("/", (req, res) => {
    res.sendFile("merhaba");
});
const io = socket(server);
app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.on('chat', data => {
        io.emit("chat", data)
    })

    socket.on("typing", name => {
        socket.broadcast.emit("typing", name)
    })
})