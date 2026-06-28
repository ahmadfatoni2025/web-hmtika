const router = require("express").Router();
const division = require("../controllers/division.controller");
const { authenticate, authorizeAdmin } = require("../middleware/auth");

router.get("/", division.getAllDivisions);
router.get("/:id", division.getDivisionById);
router.post("/", authenticate, authorizeAdmin, division.createDivision);
router.put("/:id", authenticate, authorizeAdmin, division.updateDivision);
router.delete("/:id", authenticate, authorizeAdmin, division.deleteDivision);

module.exports = router;
