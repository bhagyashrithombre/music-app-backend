require("dotenv").config();
const express = require("express");
const userRoute = require("./routes/user.route");
const playlistRoute = require("./routes/playlist.route");
const songRoute = require("./routes/song.route");
const dbConnect = require("./db");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoute);
app.use("/api/playlist", playlistRoute);
app.use("/api/song", songRoute);

// Routes
app.get("/", (req, res) => {
    res.send("Hello from the backend!");
});

const startServer = () => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
};

dbConnect(startServer);
