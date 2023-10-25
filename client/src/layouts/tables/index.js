/* eslint-disable prettier/prettier */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Box, TextField, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import MDButton from "components/MDButton";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [checked, setChecked] = React.useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    adminID: "",
    fullname: "",
    password: "",
    privileges: [],
  });

  const [validationErrors, setValidationErrors] = useState({
    adminID: "",
    fullname: "",
    password: "",
  });

  const handleAdmin = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedPrivileges = [...formData.privileges];

      if (checked) {
        updatedPrivileges.push(value);
      } else {
        const index = updatedPrivileges.indexOf(value);
        if (index > -1) {
          updatedPrivileges.splice(index, 1);
        }
      }
      setFormData({
        ...formData,
        privileges: updatedPrivileges,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { adminID, fullname, password } = formData;
    const nameRegex = /^[a-zA-Z]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    const newValidationErrors = {};

    if (!adminID) {
      newValidationErrors.adminID = "Admin ID is required.";
    }
    if (!fullname) {
      newValidationErrors.fullname = "Full name is required.";
    } else if (!nameRegex.test(fullname)) {
      newValidationErrors.fullname = "Full name should contain only letters.";
    }
    if (!password) {
      newValidationErrors.password = "Password is required.";
    } else if (!passwordRegex.test(password)) {
      newValidationErrors.password =
        "Password must be at least 6 characters long and contain letters and numbers.";
    }
    
     if (Object.keys(newValidationErrors).length === 0) {
      try {
        const res = await axios.post(
          `http://localhost:4000/api/admin/createAdmin`,
          formData
        );
       if (res.status === 201) {
          toast.success("Successfully created");
          setTimeout(()=>{
              location.reload()
          },1000)
        setSuccess("Admin created successfully")
      } 
      } catch (err) {
        setError(err);
      }
    } else {
      setValidationErrors(newValidationErrors);
    }
  };

  const isSubmitDisabled =
    !formData.adminID || !formData.fullname || !formData.password;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ToastContainer />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <Typography variant="h4" py={4}>
                  Personal Information
                </Typography>
                <Grid display="flex" lg={12}>
                  <Grid lg={4}>
                    <TextField
                      sx={{
                        padding: "10px",
                      }}
                      name="adminID"
                      label="Admin Id"
                      type="text"
                      value={formData.adminID}
                      onChange={handleAdmin}
                    />
                    <div className="error-message"  style={{ color: 'red', fontSize: '12px' }}>
                      {validationErrors.adminID}
                    </div>
                  </Grid>
                  <Grid lg={4}>
                    <TextField
                      sx={{
                        padding: "10px",
                      }}
                      name="fullname"
                      label="Full Name"
                      type="text"
                      value={formData.fullname}
                      onChange={handleAdmin}
                    />
                    <div className="error-message" style={{ color: 'red', fontSize: '12px' }}>
                      {validationErrors.fullname}
                    </div>
                  </Grid>
                  <Grid lg={4}>
                    <TextField
                      sx={{
                        padding: "10px",
                      }}
                      name="password"
                      label="Password"
                      type="password"
                      value={formData.password}
                      onChange={handleAdmin}
                    />
                    <div className="error-message" style={{ color: 'red', fontSize: '12px' }}>
                      {validationErrors.password}
                    </div>
                  </Grid>
                  <Grid lg={4}>
                    <TextField
                      sx={{
                        padding: "10px",
                      }}
                      name="confirm password"
                      label="Confirm Password"
                    />
                  </Grid>
                </Grid>
                <Typography variant="h4" py={4}>
                  Privileges
                </Typography>
                
                <Box sx={{display: "flex", flexWrap: "wrap", padding: "10px",}}>
                 <Box px={2}>
                   <FormControlLabel
                      control={<Checkbox checked={formData.privileges.includes('All')} onChange={handleAdmin} name="privileges" value="All" />}
                      label="All"
                    />
                  </Box>
                  <Box px={2}>
                    <FormControlLabel
                      control={<Checkbox checked={formData.privileges.includes('Dashboard')}
                      onChange={handleAdmin}
                      name="privileges"
                      value="Dashboard"
                       />}
                      label="Dashboard"
                    />
                  </Box>
                  <Box px={2}>
                    <FormControlLabel
                      control={<Checkbox 
                        checked={formData.privileges.includes('Market Analysis')} 
                        onChange={handleAdmin} 
                        name="privileges"
                        value="Market Analysis"
                        />}
                      label="Market Analysis"
                    />
                  </Box>
                  <Box px={2}>
                    <FormControlLabel
                      control={<Checkbox 
                        checked={formData.privileges.includes('User List')} 
                        onChange={handleAdmin} 
                        name="privileges"
                        value="User List"
                        />}
                      label="User List"
                    />
                  </Box>
                  <Box px={2}>
                    <FormControlLabel
                      control={<Checkbox 
                        checked={formData.privileges.includes('Insert User')} 
                        onChange={handleAdmin} 
                        name="privileges"
                        value="Insert User"
                        />}
                      label="Insert User"
                    />
                  </Box>
                  <Box px={2}>
                    <FormControlLabel
                      control={<Checkbox 
                        checked={formData.privileges.includes('Bank')} 
                        onChange={handleAdmin} 
                        name="privileges"
                        value="Bank"
                        />}
                      label="Bank"
                    />
                  </Box>
                  <Box px={2}>
                    <FormControlLabel
                      control={<Checkbox 
                        checked={formData.privileges.includes('Account Statement')} 
                        onChange={handleAdmin} 
                        name="privileges"
                        value="Account Statement"
                        />}
                      label="Account Statement"
                    />
                  </Box>
                  <Box px={2}>
                    <FormControlLabel
                      control={<Checkbox 
                        checked={formData.privileges.includes('Current Bets')} 
                        onChange={handleAdmin} 
                        name="privileges"
                        value="Current Bets"
                        />}
                      label="Current Bets"
                    />
                  </Box>
                  <Box px={2}>
                    <FormControlLabel
                      control={<Checkbox 
                        checked={formData.privileges.includes('User History')} 
                        onChange={handleAdmin} 
                        name="privileges"
                        value="User History"
                        />}
                      label="User History"
                    />
                  </Box>
                  <Box px={2}>
                    <FormControlLabel
                      control={<Checkbox 
                        checked={formData.privileges.includes('Casino Result')} 
                        onChange={handleAdmin} 
                        name="privileges"
                        value="Casino Result"
                        />}
                      label="Casino Result"
                    />
                  </Box>
                  <Box px={2}>
                    <FormControlLabel
                      control={<Checkbox 
                        checked={formData.privileges.includes('Events')} 
                        onChange={handleAdmin} 
                        name="privileges"
                        value="Events"
                        />}
                      label="Events"
                    />
                  </Box>
                  <Box px={2}>
                    <FormControlLabel
                      control={<Checkbox 
                        checked={formData.privileges.includes('User Authentication')} 
                        onChange={handleAdmin} 
                        name="privileges"
                        value="User Authentication"
                        />}
                      label="User Authentication"
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <MDButton
                    variant="gradient"
                    color="error"
                    sx={{ marginY: 1 }}
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled} 
                  >
                  Submit
                  </MDButton>
                  {success && (
                    <Typography
                      variant="success-message"
                      sx={{
                        fontSize: "12px",
                        paddingX: "10px",
                        textAlign: "center",
                      }}
                    >
                      {success}
                    </Typography>
                  )}
                </Box>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;


