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

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { Box, Card, TextField } from "@mui/material";
import MDButton from "components/MDButton";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "hooks/useFetch";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EditEvents() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/admin/getEventById/${id}`);
                const eventData = res?.data?.event;
                setEvent(eventData);
                const inputDate = eventData?.date;
                const dateObject = new Date(inputDate);
                const year = dateObject.getFullYear();
                const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                const day = String(dateObject.getDate()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;
                setFormData({
                    title: eventData?.title || "",
                    date: formattedDate || "",
                    sport: eventData?.sport || "",
                    location: eventData?.location || "",
                    description: eventData?.description || "",
                    outcome: eventData?.outcome || "",
                    team1: eventData?.team1 || "",
                    team2: eventData?.team2 || "",
                });

            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };

        fetchData();
    }, [id]);
    const navigate = useNavigate()
    const [err, setErr] = useState(null)
    const [message, setMessage] = useState(null)
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        sport: "",
        location: "",
        description: "",
        outcome: "",
        team1: "",
        team2: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(`http://localhost:4000/api/admin/updateEvent/${id}`, formData);
            const mess = res?.data?.message;
            toast.success("Successfully updated");
            setTimeout(() => {
                navigate('/events')
            }, 1000)
            setMessage(mess)
        } catch (err) {
            setErr(err)
        }
    };
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <ToastContainer />
            <MDBox mb={2} />
            <MDBox mt={5} mb={3}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ boxShadow: "none" }}>
                            <MDBox p={2}>
                                <MDTypography sx={{ margin: '20px' }} variant="h6" fontWeight="medium" textTransform="capitalize">
                                    Edit Event
                                </MDTypography>
                                <form>
                                    <Box p={2}>
                                        <TextField
                                            name="title"
                                            label="Title"
                                            value={formData?.title}
                                            type="text"
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Box>
                                    <Box p={2}>
                                        <TextField
                                            name="date"
                                            label="Date"
                                            value={formData?.date}
                                            type="date"
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Box>
                                    <Box p={2}>
                                        <TextField
                                            name="sport"
                                            label="Sport"
                                            value={formData?.sport}
                                            type="text"
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Box>
                                    <Box p={2}>
                                        <TextField
                                            name="location"
                                            label="Location"
                                            value={formData?.location}
                                            type="text"
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Box>
                                    <Box p={2}>
                                        <TextField
                                            name="description"
                                            label="Description"
                                            value={formData?.description}
                                            type="text"
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Box>
                                </form>
                            </MDBox>
                            <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
                            </MDBox>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ boxShadow: "none" }}>
                            <MDBox p={2}>
                                <Box p={2}>
                                    <TextField
                                        name="outcome"
                                        label="Outcome"
                                        value={formData?.outcome}
                                        type="text"
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Box>
                                <Box p={2}>
                                    <TextField
                                        label="Team 1"
                                        name="team1"
                                        value={formData?.team1}
                                        type="text"
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Box>
                                <Box p={2}>
                                    <TextField
                                        label="Team 2"
                                        name="team2"
                                        value={formData?.team2}
                                        type="text"
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Box>
                                <MDButton sx={{ margin: '20px' }} variant="gradient" color="dark" onClick={handleSubmit} >
                                    Update
                                </MDButton>
                                <p style={{ fontSize: "12px", paddingX: "20px" }}>{message ? message : null}</p>
                                <p style={{ fontSize: "12px", paddingX: "20px", color: "red" }}>{err ? err : null}</p>
                            </MDBox>
                            <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
}

export default EditEvents;
