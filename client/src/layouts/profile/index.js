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

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components

import DataTable from "examples/Tables/DataTable";
import projectsTableData from "layouts/tables/data/projectsTableData";
import authorsTableData from "layouts/tables/data/authorsTableData";
import { Button, TextField } from "@mui/material";
import MDButton from "components/MDButton";
import { Navigate, useNavigate } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useFetch from "hooks/useFetch";


function Overview() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [sports, setSports] = useState(true)
  const [casino, setCasino] = useState(false)
  const navigate = useNavigate()
  const { data, loading, error } = useFetch("http://localhost:4000/api/admin/getCurrentBets")
  const currentBets = data?.data?.currentBets || [];


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <MDBox mt={5} mb={3}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} xl={12}>
            <Card sx={{ boxShadow: "none" }}>
              <MDBox>
                <Grid xs={12} lg={12} sx={{ display: "flex", justifyContent: "space-between", paddingX: "20px" }}>
                  <MDBox height="100%" mt={2} lineHeight={1}>
                    <MDButton variant={sports ? "gradient" : "outlined"} color="dark" sx={{ marginX: "10px" }} onClick={() => { setSports(true), setCasino(false) }} >
                      Sports
                    </MDButton>
                  </MDBox>
                  <MDBox height="100%" mt={2} lineHeight={1}>
                    <MDButton variant="outlined" color="error" sx={{ marginX: "10px" }} onClick={() => { navigate('/user-history') }}>
                      User History
                    </MDButton>
                    <MDButton variant="outlined" color="warning" onClick={() => { navigate('/user-authentication') }}>
                      User Authentication
                    </MDButton>
                  </MDBox>
                </Grid>
              </MDBox>
              <MDBox p={2}>
                <MDTypography sx={{ padding: "20px" }} variant="h6" fontWeight="medium" textTransform="capitalize">
                </MDTypography>
                <Grid item xs={12} lg={12}>
                  <Card sx={{ height: "100%" }}>
                    <MDBox pt={3}>
                      <TableContainer component={Paper}>
                        <Table sx={{ width: "100%" }} aria-label="simple table">
                          <TableHead sx={{ display: "table-header-group" }}>
                            <TableRow sx={{ width: "20px" }}>
                              <TableCell >Sl.No</TableCell>
                              <TableCell >User</TableCell>
                              <TableCell >Event</TableCell>
                              <TableCell >Event Type</TableCell>
                              <TableCell >Nation</TableCell>
                              <TableCell >Amount</TableCell>
                              <TableCell >Odds</TableCell>
                              <TableCell >Time Remaining</TableCell>
                              <TableCell >Created At</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {currentBets.map((row, index) => (
                              <TableRow
                                key={row?.user}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell component="th" scope="row">
                                  {row?.user && row.user.username}
                                </TableCell>
                                <TableCell>{row?.event?.title}</TableCell>
                                <TableCell>{row?.eventType}</TableCell>
                                <TableCell>{row?.nation}</TableCell>
                                <TableCell>{row?.amount}</TableCell>
                                <TableCell>{row?.odds}</TableCell>
                                <TableCell>{row?.timeRemaining}</TableCell>
                                <TableCell>{row?.createdAt}</TableCell>
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

export default Overview;
