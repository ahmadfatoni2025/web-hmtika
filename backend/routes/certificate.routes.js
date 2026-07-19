const router = require("express").Router();
const certificate = require("../controllers/certificate.controller");
const { authenticate, authorizeAdmin } = require("../middleware/auth");

router.get("/me", certificate.getMyCertificates);
router.get("/", certificate.getAllCertificates);
router.post("/generate", authenticate, authorizeAdmin, certificate.generateCertificate);
router.post("/bulk", authenticate, authorizeAdmin, certificate.generateBulkCertificates);
router.delete("/:id", authenticate, authorizeAdmin, certificate.deleteCertificate);

module.exports = router;
