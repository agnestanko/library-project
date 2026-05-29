const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const commentRoutes = require("./routes/commentRoutes");

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors());
app.use(express.json());

connectDB();

app.set("io", io);

app.get("/", (req, res) => {
  res.send("Library API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/comments", commentRoutes);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinBookRoom", (bookId) => {
    socket.join(bookId);
    console.log(`User joined book room: ${bookId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;