const express = require("express");
const router = express.Router();
module.exports = router;

const prisma = require("../prisma");

// GET /users sends array of all users
router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    next(error);
  }
});
// GET /users/:id sends the user specified by id.
// The response should include all playlists owned by the user.
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: +id },
      include: { playlists: true },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});
// POST /users/:id/playlists creates a new playlist owned by the
// user specified by id
