const { Router } = require("express");
const { UserController } = require("../controllers");
const auth = require("../middleware/auth.middleware");

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/", auth, UserController.get);

module.exports = router;
