require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/news", require("./routes/news.routes"));
app.use("/api/events", require("./routes/event.routes"));
app.use("/api/registrations", require("./routes/registration.routes"));
app.use("/api/attendances", require("./routes/attendance.routes"));
app.use("/api/logs", require("./routes/attendanceLog.routes"));
app.use("/api/certificates", require("./routes/certificate.routes"));
app.use("/api/aspirations", require("./routes/aspiration.routes"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "HMTIKA API",
    endpoints: {
      auth: "/api/auth",
      users: "/api/users",
      news: "/api/news",
      events: "/api/events",
      registrations: "/api/registrations",
      attendances: "/api/attendances",
      logs: "/api/logs",
      certificates: "/api/certificates",
      aspirations: "/api/aspirations",
      health: "/api/health",
    },
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`HMTIKA API running on http://localhost:${PORT}`);
});
