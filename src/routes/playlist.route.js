const { Router } = require("express");
const { PlatlistContorller } = require("../controllers");
const auth = require("../middleware/auth.middleware");

const router = Router();

router.post("/", auth, PlatlistContorller.create);
router.get("/", auth, PlatlistContorller.getAll);
router.get("/:playlistId", auth, PlatlistContorller.get);
router.patch("/:playlistId", auth, PlatlistContorller.update);
router.patch("/add/:playlistId", auth, PlatlistContorller.addSong);

module.exports = router;
