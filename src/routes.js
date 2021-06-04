const user = require("./controllers/user.controller");
const schedule = require("./controllers/schedule.controller");
const scheduleHour = require("./controllers/schedule.hour.controller");
const express = require("express");
const router = express.Router();
const auth = require("./services/userAuth");

router.get("/", (req, res) => {
  res.send({ message: "Hello, welcome to agendaí API!" });
});

//User Authentication
router.post("/users/signin", auth.signIn);
router.get("/verifyToken", auth.verifyToken);
router.get("/confirm/:confirmationCode", auth.verifyUser);
router.post("/reset-password", auth.resetPassword);
router.put(
  "/reset-password/:confirmationCode",
  auth.validJWTNeeded,
  user.updateUser
);

//User
router.get("/users", auth.validJWTNeeded, user.getUsers);
router.get("/users/:id", auth.validJWTNeeded, user.getUserById);
router.post("/users", user.createUser);
router.put("/users/:id", auth.validJWTNeeded, user.updateUser);
router.delete("/users/:id", auth.validJWTNeeded, user.deleteUser);

//Schedule
router.get("/schedule", auth.validJWTNeeded, schedule.getSchedule);
router.get("/schedule/:id", auth.validJWTNeeded, schedule.getScheduleById);
router.post("/schedule", auth.validJWTNeeded, schedule.createSchedule);
router.put("/schedule/:id", auth.validJWTNeeded, schedule.updateSchedule);
router.delete("/schedule/:id", auth.validJWTNeeded, schedule.deleteSchedule);

//Schedule Hour
router.get("/scheduleHour", auth.validJWTNeeded, scheduleHour.getScheduleHour);
router.post(
  "/scheduleHour",
  auth.validJWTNeeded,
  scheduleHour.createScheduleHour
);
router.delete(
  "/scheduleHour/:id",
  auth.validJWTNeeded,
  scheduleHour.deleteScheduleHour
);

module.exports = router;
