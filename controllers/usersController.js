const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    //    Email Validation
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    //    Set User
    user = new User(req.body);

    //    Password Hash
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    //    Save User
    await user.save();

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
    res.status(400).json({ msg: "Ha ocurrido un error" });
  }
};
