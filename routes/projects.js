const router = require("express").Router();
const projectC = require("../controllers/projectsController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//    Create a Project
router.post(
  "/",
  auth,
  [check("name", "El nombre del projecto es obligatorio").not().isEmpty()],
  projectC.createProject
);

//    Get the Projects
router.get(
  "/",
  auth,

  [check("name", "El nombre del projecto es obligatorio").not().isEmpty()],
  projectC.getProjects
);

//    Put Projects
router.put(
  "/:id",
  auth,
  [check("name", "El nombre del projecto es obligatorio").not().isEmpty()],
  projectC.putProject
);

//    Delete Project
router.delete("/:id",
  auth,
  projectC.deleteProject
)
module.exports = router;
