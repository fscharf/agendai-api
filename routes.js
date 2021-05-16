const user = require("./controllers/UserController");
const schedule = require("./controllers/ScheduleController");
const express = require("express");
const router = express.Router();
const auth = require("./services/userAuth");

router.get("/", (req, res) => {
  res.json({ info: "Barber Shop API" });
});

router.post("/users/signin", auth.signIn);
router.get("/verifyToken", auth.verifyToken);

router.get("/users", user.getUsers);
router.get("/users/:id", user.getUserById);
router.post("/users", user.createUser);
router.put("/users/:id", user.updateUser);
router.delete("/users/:id", user.deleteUser);

router.get("/schedule", schedule.getSchedule);
router.get("/schedule/:id", schedule.getScheduleById);
router.post("/schedule", schedule.createSchedule);
router.put("/schedule/:id", schedule.updateSchedule);
router.delete("/schedule/:id", schedule.deleteSchedule);

module.exports = router;
