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

import Header from "layouts/profile/components/Header";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import useFetch from "hooks/useFetch";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import { Box, Button, Card, TextField } from "@mui/material";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {  useState } from "react";
import axios from "axios";

function ActiveUser() {

  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const {data,loading,error} = useFetch("http://localhost:4000/api/user/alluser")
  const users = data?.data  || [];
  
  const handleEdit = (id) => {
    navigate(`/users/active-user/edit-user/${id}`)
  }
  

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if(isConfirmed){
      axios.delete(`http://localhost:4000/api/user/deleteUser/${id._id}`)
      .then(() => {
        toast.success("Successfully deleted");
        setTimeout(()=>{
          location.reload()
        },1000)
      })
      .catch((error) => {
        console.error('Error deleting user', error);
      })
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <ToastContainer />
      <MDBox mt={8}>
        <MDBox mb={3}>
        <Card sx={{ boxShadow: "none" }}>
          <Grid xs={12} lg={12} sx={{ display: "flex", justifyContent: "end", paddingX: "20px" }}>
              <MDBox height="100%" mt={2} lineHeight={1}>
                <MDButton 
                  variant="gradient" 
                  color="error" 
                  sx={{margin: "10px"}} 
                  onClick={()=>{navigate('/users/active-user')}}
                >
                  Active User
                </MDButton>
                <MDButton 
                  variant="outlined" 
                  color="warning" 
                  sx={{margin: "10px"}} 
                  onClick={()=>{navigate('/users/create-user')}}
                >
                  Create User
                </MDButton>
              </MDBox>
          </Grid>
          <Grid container spacing={3}>
             <Grid item xs={12} lg={12}>
              <Card sx={{ padding:"20px",boxShadow: "1px" }}>
                <TableContainer component={Paper}>
                  <Table sx={{ width: "100%" }} aria-label="simple table">
                    <TableHead sx={{ display: "table-header-group" }}>
                      <TableRow sx={{width: "20px"}}>
                        <TableCell >Sl.No</TableCell>
                        <TableCell >Email</TableCell>
                        <TableCell >Username</TableCell>
                        <TableCell >Full name</TableCell>
                        <TableCell >Nation</TableCell>
                        <TableCell >Mobile</TableCell>
                        <TableCell >Balance</TableCell>
                        <TableCell >Edit</TableCell>
                        <TableCell >Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((row, index) => (
                        <TableRow
                        key={row?.email}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell component="th" scope="row">
                            {row?.email}
                          </TableCell>
                          <TableCell>{row?.username}</TableCell>
                          <TableCell>{row?.fullname}</TableCell>
                          <TableCell>{row?.nation}</TableCell>
                          <TableCell>{row?.mobile}</TableCell>
                          <TableCell>{row?.balance}</TableCell>
                          <TableCell>
                            <MDButton 
                            variant="outlined" 
                            color="primary" 
                            onClick={() => handleEdit(row._id)}
                            >
                              Edit
                            </MDButton>
                          </TableCell>
                          <TableCell>
                            <MDButton 
                            variant="outlined" 
                            color="secondary" 
                            onClick={() => handleDelete(row)}
                            >
                              Delete
                            </MDButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
          </Grid>
        </Card>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default ActiveUser;
