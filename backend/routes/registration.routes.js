const router = require("express").Router();
const registration = require("../controllers/registration.controller");
const { authenticate, authorizeAdmin } = require("../middleware/auth");

router.post("/event/:id", authenticate, registration.registerEvent);
router.get("/me", authenticate, registration.getMyRegistrations);
router.get("/", authenticate, authorizeAdmin, registration.getAllRegistrations);
router.put("/:id", authenticate, authorizeAdmin, registration.updateRegistration);
router.delete("/:id", authenticate, authorizeAdmin, registration.deleteRegistration);

module.exports = router;
