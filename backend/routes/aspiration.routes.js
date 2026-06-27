const router = require("express").Router();
const aspiration = require("../controllers/aspiration.controller");
const { authenticate, authorizeAdmin } = require("../middleware/auth");

router.get("/stats", authenticate, authorizeAdmin, aspiration.getAspirationStats);
router.get("/", aspiration.getAllAspirations);
router.post("/", aspiration.createAspiration);
router.put("/:id", authenticate, authorizeAdmin, aspiration.respondAspiration);
router.delete("/:id", authenticate, authorizeAdmin, aspiration.deleteAspiration);

module.exports = router;
