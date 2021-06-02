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
router.get("/confirm/:confirmationCode", auth.verifyUser);
router.post("/reset-password", auth.resetPassword);

router.get("/users", auth.validJWTNeeded, user.getUsers);
router.get("/users/:id", auth.validJWTNeeded, user.getUserById);
router.post("/users", user.createUser);
router.put("/users/:id", auth.validJWTNeeded, user.updateUser);
router.put("/users/:confirmationCode", auth.validJWTNeeded, user.updateUser);
router.delete("/users/:id", auth.validJWTNeeded, user.deleteUser);

router.get("/schedule", auth.validJWTNeeded, schedule.getSchedule);
router.get("/schedule/:id", auth.validJWTNeeded, schedule.getScheduleById);
router.post("/schedule", auth.validJWTNeeded, schedule.createSchedule);
router.put("/schedule/:id", auth.validJWTNeeded, schedule.updateSchedule);

module.exports = router;
