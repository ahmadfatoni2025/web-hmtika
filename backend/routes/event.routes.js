const router = require("express").Router();
const event = require("../controllers/event.controller");
const { authenticate, authorizeAdmin } = require("../middleware/auth");

router.get("/", event.getAllEvents);
router.get("/:slug", event.getEventBySlug);
router.post("/", authenticate, authorizeAdmin, event.createEvent);
router.put("/:id", authenticate, authorizeAdmin, event.updateEvent);
router.delete("/:id", authenticate, authorizeAdmin, event.deleteEvent);

module.exports = router;
