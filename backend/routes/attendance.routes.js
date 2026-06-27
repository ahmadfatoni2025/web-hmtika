const router = require("express").Router();
const attendance = require("../controllers/attendance.controller");
const { authenticate, authorizeAdmin } = require("../middleware/auth");

router.get("/event/:eventId", authenticate, authorizeAdmin, attendance.getAttendancesByEvent);
router.post("/", authenticate, authorizeAdmin, attendance.createAttendance);
router.put("/:id", authenticate, authorizeAdmin, attendance.updateAttendance);
router.delete("/:id", authenticate, authorizeAdmin, attendance.deleteAttendance);

module.exports = router;
