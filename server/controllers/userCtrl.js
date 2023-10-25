const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require(`jsonwebtoken`);

const register = async (req, res) => {
  try {
    const { username, fullname, email, password, nation, mobile, balance } =
      req.body;

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new userModel({
      username,
      fullname,
      email,
      password: hashedPassword,
      nation,
      mobile,
      lastLogin: new Date(),
      balance,
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

//Login
const Login = async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email });
    const userEmail = req.body.email;
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!user) {
      return res.status(400).send("The user not found");
    }
  
    await userModel.findByIdAndUpdate(
      { _id: user._id },
      {
        isAuthenticated: true,
        lastLogin:  Date.now(),
        loginHistory: [{ timestamp:  Date.now(), source: "source" }],
      }
    );
  
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
  
        {
          userId: user.id,
        },
        JWT_SECRET,
        { expiresIn: "4w" }
        
      );
      res.status(200).send({ user: user.email, token: token });
    } else {
      res.status(400).send("Password is Wrong!");
    }
  };
  
  //ALL USERS
  const allusers = async (req, res) => {
    try {
      const activeUser = await userModel.find({ accountStatus: "active" });
      return res.json(activeUser);
    } catch (error) {
      res.json(error);
    }
  };

  const deleteUsers = async (req, res) => {
    const userId = req.params.id;
    try {
      const deletedUser = await userModel.findByIdAndDelete(userId);
      if(!deletedUser) {
        return res.status(404).json({ success:false, message: `Cannot find by any user with ID ${userId}` });
      }
      res.status(201).json({ success: true, message: "User Deleted Successfully", deletedUser});
    } catch(error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });  
    }
  };

  const updateUsers = async (req, res) => {
    try {
      const userId = req.params.id;
      const { username, fullname, email, nation, mobile, balance, accountStatus } =
        req.body;
      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ success:false, message: "User not found" });
      }

      const updatedUser = await userModel.updateOne({_id:userId},{
        $set:{
          username : username,
          fullname : fullname,
          email : email,
          nation : nation,
          mobile : mobile,
          balance : balance,
          accountStatus : accountStatus
        }
      })

      res.status(200).json({ success:true, message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ success:false, message: "Update failed", error: error.message });
    }
  };
  
  //All user Login History
  const getAllUsersLoginHistory = async (req, res) => {
    try {
      // Find all users and select the necessary fields, including loginHistory
      const users = await userModel
        .find({}, "username loginHistory")
        .populate("loginHistory")
        .exec();
  
      // Process the user data to extract login history
      const loginHistoryForAllUsers = await users.map((user) => ({
        userId: user._id,
        username: user.username,
        loginHistory: user.loginHistory,
      }));
  
      res.status(200).json({ success: true, loginHistoryForAllUsers });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving login history for all users",
        error: error.message,
      });
    }
  };

  const getSingleUserById = async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await userModel.findById(userId);
      if(!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      return res.status(200).json({ success: true, user});
    } catch (error) {
      return res.status(500).json({ success: false, message: `Error fetching user by ID ${userId}`, error: error.message });
    }
  };

  const usersActiveAndInActive = async(req,res) => {
    try {
      const usersActiveAndInActive = await userModel.find();
      return res.json({ success: true, usersActiveAndInActive});
    } catch(error) {
      res.json(error);
    }
  };
  
  module.exports = {
    register,
    Login,
    allusers,
    deleteUsers,
    updateUsers,
    getAllUsersLoginHistory,
    getSingleUserById,
    usersActiveAndInActive
  };
  
