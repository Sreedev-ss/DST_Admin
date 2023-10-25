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
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";
import DataTable from "examples/Tables/DataTable";
import { Card } from "@mui/material";
import MDButton from "components/MDButton";
import authorsTableData from "layouts/tables/data/authorsTableData";
import { useNavigate } from "react-router-dom";
import useFetch from "hooks/useFetch";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function UserAuth() {
  const navigate = useNavigate()
  const {data,loading,error} = useFetch("http://localhost:4000/api/user/allUser")
  const userAuth = data?.data || [];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} xl={12}>
            <Card sx={{ boxShadow: "none" }}>
            <MDBox>
                <Grid xs={12} lg={12} sx={{ display: "flex", justifyContent: "end", paddingX: "20px" }}>
                    <MDBox height="100%" mt={2} lineHeight={1}>
                    <MDButton variant="outlined" color="error" sx={{marginX: "10px"}} onClick={()=>{navigate('/user-history')}}>
                        User History
                    </MDButton>
                    <MDButton variant="gradient" color="warning" onClick={()=>{navigate('/user-authentication')}}>
                        User Authentication
                    </MDButton>
                    </MDBox>
                </Grid>
            </MDBox>  
            <MDBox p={2}>
                <MDTypography sx={{ padding: "20px" }} variant="h6" fontWeight="medium" textTransform="capitalize">
                User Authentication
                </MDTypography>
                <Grid item xs={12} lg={12}>
                <Card sx={{ height: "100%" }}>
                    <MDBox pt={3}>
                    <TableContainer component={Paper}>
                  <Table sx={{ width: "100%" }} aria-label="simple table">
                    <TableHead sx={{ display: "table-header-group" }}>
                      <TableRow sx={{width: "20px"}}>
                        <TableCell >Username</TableCell>
                        <TableCell >Authentication</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userAuth.map((row) => (
                        <TableRow
                          key={row?._id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row?.username}
                          </TableCell>
                          <TableCell>{row?.isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                  </Table>
                </TableContainer>
                    </MDBox>
                </Card>
                </Grid>
            </MDBox>
            </Card>
            </Grid>
          </Grid>
        </MDBox>
    </DashboardLayout>
  );
}

export default UserAuth;
