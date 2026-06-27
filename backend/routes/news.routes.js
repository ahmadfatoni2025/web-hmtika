const router = require("express").Router();
const news = require("../controllers/news.controller");
const { authenticate, authorizeAdmin } = require("../middleware/auth");

router.get("/", news.getAllNews);
router.get("/admin", authenticate, authorizeAdmin, news.getAllNewsAdmin);
router.get("/:slug", news.getNewsBySlug);
router.post("/", authenticate, authorizeAdmin, news.createNews);
router.put("/:id", authenticate, authorizeAdmin, news.updateNews);
router.delete("/:id", authenticate, authorizeAdmin, news.deleteNews);

module.exports = router;
