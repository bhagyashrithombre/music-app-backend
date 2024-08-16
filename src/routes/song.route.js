const { Router } = require("express");
const { SongController } = require("../controllers");
const auth = require("../middleware/auth.middleware");

const router = Router();

router.post("/", auth, SongController.create);
router.get("/", auth, SongController.getAll);
router.get("/:songId", auth, SongController.get);

module.exports = router;
