const user = require("./controllers/user.controller");
const schedule = require("./controllers/schedule.controller");
const scheduleHour = require("./controllers/schedule.hour.controller");
const scheduleAtt = require("./controllers/schedule.att.controller");
const express = require("express");
const router = express.Router();
const auth = require("./services/userAuth");

router.get("/", (req, res) => {
  res.send({ message: "Web API" });
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
router.get("/scheduleHour", auth.validJWTNeeded, scheduleHour.get);
router.get("/scheduleHour/:id", auth.validJWTNeeded, scheduleHour.getById);
router.post("/scheduleHour", auth.validJWTNeeded, scheduleHour.create);
router.put("/scheduleHour/:id", auth.validJWTNeeded, scheduleHour.update);
router.delete("/scheduleHour/:id", auth.validJWTNeeded, scheduleHour.destroy);

//Schedule Attendance
router.get("/schedule-att", auth.validJWTNeeded, scheduleAtt.get);
router.get("/schedule-att/:id", auth.validJWTNeeded, scheduleAtt.getById);
router.post("/schedule-att", auth.validJWTNeeded, scheduleAtt.create);
router.put("/schedule-att/:id", auth.validJWTNeeded, scheduleAtt.update);
router.delete("/schedule-att/:id", auth.validJWTNeeded, scheduleAtt.destroy);

//CtrlSystem
let ctrlSystem = require("./models/json/ctrl_system.json");

router.get('/ctrl-system', (req, res) => {
  res.send(ctrlSystem);
});

router.get("/ctrl-system/:ctrl_system", (req, res) => {
  const findCtrl = ctrlSystem.find((data) => data.ctrl_system === req.params.ctrl_system);
  res.json(findCtrl);
});

module.exports = router;
