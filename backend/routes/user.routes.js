const router = require("express").Router();
const user = require("../controllers/user.controller");
const { authenticate, authorizeAdmin } = require("../middleware/auth");

router.get("/me", authenticate, user.getMe);
router.put("/me", authenticate, user.updateProfile);
router.get("/", authenticate, authorizeAdmin, user.getAllUsers);
router.get("/stats", authenticate, authorizeAdmin, user.getDashboardStats);
router.get("/:id", authenticate, user.getUser);
router.put("/:id", authenticate, authorizeAdmin, user.updateUser);
router.delete("/:id", authenticate, authorizeAdmin, user.deleteUser);

module.exports = router;
