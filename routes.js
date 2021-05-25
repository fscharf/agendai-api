const user = require("./src/controllers/UserController");
const schedule = require("./src/controllers/ScheduleController");
const express = require("express");
const router = express.Router();
const auth = require("./src/services/userAuth");
const cors = require("cors");

var corsOptions = { origin: "http://localhost:3000" };

router.get("/", (req, res) => {
  res.json({ info: "Barber Shop API" });
});

router.post("/users/signin", cors(corsOptions), auth.signIn);
router.get("/verifyToken", cors(corsOptions), auth.verifyToken);
router.get("/confirm/:confirmationCode", cors(corsOptions), auth.verifyUser);

router.get("/users", cors(corsOptions), user.getUsers);
router.get("/users/:id", cors(corsOptions), user.getUserById);
router.post("/users", cors(corsOptions), user.createUser);
router.put("/users/:id", cors(corsOptions), user.updateUser);
router.delete("/users/:id", cors(corsOptions), user.deleteUser);

router.get("/schedule", cors(corsOptions), schedule.getSchedule);
router.get("/schedule/:id", cors(corsOptions), schedule.getScheduleById);
router.post("/schedule", cors(corsOptions), schedule.createSchedule);
router.put("/schedule/:id", cors(corsOptions), schedule.updateSchedule);
router.delete("/schedule/:id", cors(corsOptions), schedule.deleteSchedule);

module.exports = router;
