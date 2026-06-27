const router = require("express").Router();
const log = require("../controllers/attendanceLog.controller");
const { authenticate, authorizeAdmin } = require("../middleware/auth");

router.get("/me", authenticate, log.getMyAttendances);
router.get("/:attendanceId", authenticate, authorizeAdmin, log.getLogsByAttendance);
router.post("/checkin/:kodeAbsen", authenticate, log.checkIn);
router.delete("/:id", authenticate, authorizeAdmin, log.deleteLog);

module.exports = router;
