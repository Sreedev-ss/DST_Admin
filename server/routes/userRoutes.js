const express = require("express");
const {
  register,
  Login,
  allusers,
  deleteUsers,
  updateUsers,
  getAllUsersLoginHistory,
  getSingleUserById,
  usersActiveAndInActive
} = require("../controllers/userCtrl");

//router
const router = express.Router();

router.post("/registerUser", register);
router.post("/login", Login);
router.get("/alluser", allusers);
router.delete("/deleteUser/:id", deleteUsers);
router.patch("/updateUser/:id", updateUsers);
router.get("/LoginHistory", getAllUsersLoginHistory);
router.get('/getSingleUserById/:id', getSingleUserById);
router.get('/usersActiveAndInActive', usersActiveAndInActive);



module.exports = router;
