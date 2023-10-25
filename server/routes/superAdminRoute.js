const express = require("express");
const {
  SuperAdminRegister,
  superAdminLogin,
} = require("../controllers/superAdminCtrl");

//router
const router = express.Router();

router.post("/superadminlogin", superAdminLogin);

module.exports = router;
