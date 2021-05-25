const user = require("./src/controllers/UserController");
const schedule = require("./src/controllers/ScheduleController");
const express = require("express");
const router = express.Router();
const auth = require("./src/services/userAuth");
const authMiddleware = require('./src/services/middleware')

router.get("/", (req, res) => {
  res.json({ info: "Barber Shop API" });
});

router.post("/users/signin", auth.signIn);
router.get("/verifyToken", auth.verifyToken);
router.get("/confirm/:confirmationCode", auth.verifyUser);

router.get("/users", authMiddleware.validJWTNeeded, user.getUsers);
router.get("/users/:id", authMiddleware.validJWTNeeded, user.getUserById);
router.post("/users", authMiddleware.validJWTNeeded, user.createUser);
router.put("/users/:id", authMiddleware.validJWTNeeded, user.updateUser);
router.delete("/users/:id", authMiddleware.validJWTNeeded, user.deleteUser);

router.get("/schedule", authMiddleware.validJWTNeeded, schedule.getSchedule);
router.get("/schedule/:id", authMiddleware.validJWTNeeded, schedule.getScheduleById);
router.post("/schedule", authMiddleware.validJWTNeeded, schedule.createSchedule);
router.put("/schedule/:id", authMiddleware.validJWTNeeded, schedule.updateSchedule);
router.delete("/schedule/:id", authMiddleware.validJWTNeeded, schedule.deleteSchedule);

module.exports = router;
