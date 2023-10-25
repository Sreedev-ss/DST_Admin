const superAdminModel = require("../models/superAdminModel");
const bcrypt = require("bcrypt");
const jwt = require(`jsonwebtoken`);

const SuperAdminRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingAdmin = await superAdminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new superAdminModel({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Registration failed", error });
  }
};

const superAdminLogin = async (req, res) => {
  try {
    const user = await superAdminModel.findOne({ username: req.body.username });
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!user) {
      return res.status(400).send("The user not found");
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        {
          userId: user.id,
        },
        JWT_SECRET,
        { expiresIn: "4w" }
      );

      res.status(200).send({ user: user.username, status: true, token: token });
    } else {
      res.status(404).send("Password is Wrong!");
    }
  } catch (error) {
    res.status(500).send(error)
  }
};

module.exports = {
  SuperAdminRegister,
  superAdminLogin,
};
