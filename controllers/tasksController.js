const Task = require("../models/Task");
const Project = require("../models/Project");
const { validationResult } = require("express-validator");

exports.createTask = async (req, res) => {
  //    Errors Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  //    get Proyect and Validation

  try {
    const { project } = req.body;
    const isProject = await Project.findById(project);
    if (!isProject) {
      return res.status(404).json({ msg: "Projecto no encontrado" });
    }

    //  project's User
    if (isProject.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    //  create task
    const task = new Task(req.body);
    await task.save();
    res.json({ task });
  } catch (err) {
    console.log(err);
    res.status(500).send("Hubo un error");
  }
};

exports.getTasks = async (req, res) => {
  try {
    // get Project
    const { project } = req.query;
    const isProject = await Project.findById(project);
    if (!isProject) {
      return res.status(404).json({ msg: "Projecto no encontrado" });
    }

    //  project's User
    if (isProject.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    //  get tasks by project
    const tasks = await Task.find({ project }).sort({ record: -1 });
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).send("Hubo un error");
  }
};

exports.updateTask = async (req, res) => {
  try {
    // get Project
    const { project, name, status } = req.body;
    const isTask = await Task.findById(req.params.id);

    if (!isTask) {
      return res.status(401).json({ msg: "No existe esa tarea" });
    }

    const isProject = await Project.findById(project);
    //  project's User
    if (isProject.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    const newTask = {};

    newTask.name = name;
    newTask.status = status

    const task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, {
      new: true,
    });
    res.json({ task });
  } catch (err) {
    console.log(err);
    res.status(500).send("Hubo un error");
  }
};

exports.deleteTask = async (req, res) => {
  try {
    // get Project
    const { project } = req.query;
    const isTask = await Task.findById(req.params.id);

    if (!isTask) {
      return res.status(401).json({ msg: "No existe esa tarea" });
    }

    const isProject = await Project.findById(project);
    //  project's User
    if (isProject.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    await Task.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarea Eliminada" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Hubo un error");
  }
};
