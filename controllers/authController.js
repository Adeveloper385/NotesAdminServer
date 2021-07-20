const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.userAuth = async (req, res) => {
  //    Errors Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    //    Search User
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Este usuario no exite" });
    }

    //    Confirm Password
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(400).json({ msg: "Contraseña Incorrecta" });
    }

    //    create and sign JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRETWORD,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err);
  }
};

//    get auth users
exports.getAuthUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
