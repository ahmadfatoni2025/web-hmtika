const router = require("express").Router();
const member = require("../controllers/member.controller");
const { authenticate, authorizeAdmin } = require("../middleware/auth");

router.get("/", member.getAllMembers);
router.get("/:id", member.getMemberById);
router.post("/", authenticate, authorizeAdmin, member.createMember);
router.put("/:id", authenticate, authorizeAdmin, member.updateMember);
router.delete("/:id", authenticate, authorizeAdmin, member.deleteMember);

module.exports = router;
