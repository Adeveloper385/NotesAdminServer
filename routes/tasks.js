const router = require("express").Router();
const tasksC = require("../controllers/tasksController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//  api/task
router.post(
  "/",
  auth,
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("project", "El proyecto es obligatorio").not().isEmpty()
  ],
  tasksC.createTask
);

//  get Task
router.get("/",auth, tasksC.getTasks)

//  put Task
router.put("/:id", auth, tasksC.updateTask)

router.delete("/:id", auth, tasksC.deleteTask)

module.exports = router;
