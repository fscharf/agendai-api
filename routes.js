const user = require("./src/controllers/UserController");
const schedule = require("./src/controllers/ScheduleController");
const express = require("express");
const router = express.Router();
const auth = require("./src/services/userAuth");
const ValidationMiddleware = require("./src/services/middleware");

router.get("/", (req, res) => {
  res.json({ info: "Barber Shop API" });
});

router.post("/users/signin", auth.signIn);
router.get("/verifyToken", auth.verifyToken);
router.get("/confirm/:confirmationCode", auth.verifyUser);

router.get("/users", ValidationMiddleware.validJWTNeeded, user.getUsers);
router.get("/users/:id", ValidationMiddleware.validJWTNeeded, user.getUserById);
router.post("/users", ValidationMiddleware.validJWTNeeded, user.createUser);
router.put("/users/:id", ValidationMiddleware.validJWTNeeded, user.updateUser);
router.delete("/users/:id", ValidationMiddleware.validJWTNeeded, user.deleteUser);

router.get("/schedule", ValidationMiddleware.validJWTNeeded, schedule.getSchedule);
router.get("/schedule/:id", ValidationMiddleware.validJWTNeeded, schedule.getScheduleById);
router.post("/schedule", ValidationMiddleware.validJWTNeeded, schedule.createSchedule);
router.put("/schedule/:id", ValidationMiddleware.validJWTNeeded, schedule.updateSchedule);
router.delete("/schedule/:id", ValidationMiddleware.validJWTNeeded, schedule.deleteSchedule);

module.exports = router;
