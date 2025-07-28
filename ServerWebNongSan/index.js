require("dotenv").config();
const allowedOrigins = process.env.LOCALHOST.split(",");
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
app.use(cors(corsOptions));

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(process.cwd(), "public")));
app.use(cookieParser());

// import routes admin
const dashboardRoute = require("./routes/admin/dashboard");
const userRoute = require("./routes/admin/user");
const productRoute = require("./routes/admin/products");
const uploadRoute = require("./routes/admin/upload");
const BlogRoute = require("./routes/admin/blog");

app.use("/api/admin", userRoute);
app.use("/api/admin", dashboardRoute);
app.use("/api/admin", productRoute);
app.use("/api/admin", uploadRoute);
app.use("/api/admin", BlogRoute);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// import routes client
const clientFooter = require("./routes/client/footer");
const clientComment = require("./routes/client/comment");
const clientNews = require("./routes/client/new");
const clientProduct = require("./routes/client/product");
const clientUser = require("./routes/client/user");
const clientBlog = require("./routes/client/blog");
const ErrorRoute = require("./routes/Error/error");

app.use("/api/client", clientFooter);
app.use("/api/client", clientComment);
app.use("/api/client", clientNews);
app.use("/api/client", clientProduct);
app.use("/api/client", clientUser);
app.use("/api/error", ErrorRoute);
app.use("/api/client", clientBlog);

// uploads image
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

const room = {};

io.on("connection", (socket) => {
  socket.on("client_message", ({ roomId, message }) => {
    if (message === "/end") {
      delete room[roomId];
      socket.leave(roomId);
      io.to(roomId).emit("chat_ended");
      return;
    }

    if (!roomId || !room[roomId]) {
      roomId = `room_${Date.now()}`;
      room[roomId] = { messages: [], clientId: socket.id };
      console.log(`New room created: ${roomId}`);
      socket.emit("room_created", roomId);
    }

    room[roomId].messages.push({ sender: socket.id, message, roomId });
    socket.join(roomId);
    io.to(roomId).emit("new_message", { sender: "client", message, roomId });

    // Bot
    const botResponse = `Bot response to: ${message}`;
    room[roomId].messages.push({ sender: "bot", message: botResponse });
    setTimeout(() => {
      io.to(roomId).emit("new_message", {
        sender: "bot",
        message: botResponse,
        roomId,
      });
    }, 1000);
  });

  // when admin send a message
  socket.on("admin_message", ({ roomId, message }) => {
    if (!room[roomId]) return;
    room[roomId].messages.push({ sender: "admin", message });
    io.to(roomId).emit("new_message", { sender: "admin", message, roomId });
  });

  // Admin get list of rooms
  socket.on("get_rooms", () => {
    const roomList = Object.keys(room);
    socket.emit("room_list", roomList);
  });

  // Join room
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
  });
});
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
