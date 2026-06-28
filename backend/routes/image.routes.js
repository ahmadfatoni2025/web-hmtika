const router = require("express").Router();
const image = require("../controllers/image.controller");
const { authenticate, authorizeAdmin } = require("../middleware/auth");

router.get("/", image.getAllImages);
router.get("/:id", image.getImageById);
router.post("/", authenticate, authorizeAdmin, image.createImage);
router.put("/:id", authenticate, authorizeAdmin, image.updateImage);
router.delete("/:id", authenticate, authorizeAdmin, image.deleteImage);

module.exports = router;
