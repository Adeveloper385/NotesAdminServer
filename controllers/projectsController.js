const Project = require("../models/Project");
const { validationResult } = require("express-validator");

//    api/projects
//    create a Project
exports.createProject = async (req, res) => {
  //    Errors Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  try {
    //    Create Project
    const project = new Project(req.body);

    //    Save User with  jwt
    project.user = req.user.id;

    //    Save project
    project.save();
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Ha ocurrido un error" });
  }
};

//    Get Projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id }).sort({
      record: -1,
    });
    res.json(projects);
  } catch (err) {
    res.status(500).send("Hubo un error");
  }
};

//    Put project
exports.putProject = async (req, res) => {
  //    Errors Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  //    Get project data
  const { name } = req.body;
  const newProject = {};

  if (name) {
    newProject.name = name;
  }

  try {
    //  check id
    let = project = await Project.findById(req.params.id);

    //  project ?
    if (!project) {
      res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    //  project's User
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }
    //  update project
    project = await Project.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newProject },
      { new: true }
    );

    res.json({project})
  } catch (err) {
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};

//    Delete Project
exports.deleteProject = async(req, res) => {
  try {
    //  check id
    let = project = await Project.findById(req.params.id);

    //  project ?
    if (!project) {
      res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    //  project's User
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    //  delete Project
    await Project.findOneAndRemove({_id: req.params.id})
    res.json({msg: "Proyecto Eliminado"})

  } catch(err) {
  
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
}
