const router = require("express").Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({
      status: "UP",
      database: "CONNECTED",
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({
      status: "DOWN",
      database: "DISCONNECTED",
      error: error.message,
      timestamp: new Date()
    });
  }
});

module.exports = router;
