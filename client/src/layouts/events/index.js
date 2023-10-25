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
import { Card } from "@mui/material";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import useFetch from "hooks/useFetch";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UserHistory from "layouts/userHistory";
import axios from "axios";
import { useEffect, useState } from "react";


function Events() {

  const navigate = useNavigate()

  const handleCreate = (event) => {
    navigate('/events/add-events')
  }
  const handleEdit = (event) => {
    navigate(`/events/edit-events/${event._id}`);
  };
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch events from the API
    axios.get('http://localhost:4000/api/admin/getAllEvents')
      .then((response) => {
        setEvents(response?.data?.events);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  const handleDelete = (event) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this event?");
    const eventId = event._id
    if (isConfirmed) {
      // Make the delete request
      axios.delete(`http://localhost:4000/api/admin/deleteEvent/${event._id}`)
        .then((response) => {
          if (response?.data?.success) {
            const updatedEvents = events.filter((event) => event._id !== eventId);
            setEvents(updatedEvents);
          }
        })
        .catch((error) => {
          console.error('Error deleting event:', error);
        });
    }
  };



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} xl={12}>
            <Card sx={{ boxShadow: "none" }}>
            <MDBox p={2} >
                <MDTypography sx={{ padding: "20px" }} variant="h6" fontWeight="medium" textTransform="capitalize">
                Events
                </MDTypography>
                <Grid item xs={12} lg={12}>
                <Card sx={{ height: "100%" }}>
                  <MDButton variant="gradient" color="error" sx={{margin: "10px", width: "20%", padding: "10px", alignSelf:"end"}} onClick={handleCreate}>
                    Create Event
                  </MDButton>
                  <TableContainer component={Paper}>
                  <Table sx={{ width: "100%" }} aria-label="simple table">
                    <TableHead sx={{ display: "table-header-group" }}>
                      <TableRow sx={{width: "20px"}}>
                        <TableCell >Title</TableCell>
                        <TableCell >Date</TableCell>
                        <TableCell >Location</TableCell>
                        <TableCell >Sport</TableCell>
                        <TableCell >Team 1</TableCell>
                        <TableCell >Team 2</TableCell>
                        <TableCell >Edit</TableCell>
                        <TableCell >Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {events.map((row) => (
                        <TableRow
                          key={row?._id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row?.title}
                          </TableCell>
                          <TableCell>{row?.date}</TableCell>
                          <TableCell>{row?.location}</TableCell>
                          <TableCell>{row?.sport}</TableCell>
                          <TableCell>{row?.team1}</TableCell>
                          <TableCell>{row?.team2}</TableCell>
                          <TableCell>
                            <MDButton variant="outlined" color="warning" onClick={() => handleEdit(row)}>Edit</MDButton>
                          </TableCell>
                          <TableCell>
                            <MDButton variant="outlined" color="dark" onClick={() => handleDelete(row)}>Delete</MDButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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

export default Events;
