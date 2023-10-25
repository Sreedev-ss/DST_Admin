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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddEvents() {
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        sport: '',
        location: '',
        description: '',
        outcome: '',
        team1: '',
        team2: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError(null)
    };

    const isFormValid = () => {
        const requiredFields = [
            "title",
            "date",
            "sport",
            "location",
            "description",
            "outcome",
            "team1",
            "team2",
        ];

        return requiredFields.every((field) => formData[field].trim() !== "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            setError("All fields are required");
        } else {
            try {
                const res = await axios.post("http://localhost:4000/api/admin/createEvent", formData)
                const mess = res?.data?.message;
                setMessage(mess)
                setFormData({
                    title: "",
                    date: "",
                    sport: "",
                    location: "",
                    description: "",
                    outcome: "",
                    team1: "",
                    team2: "",

                })
                toast.success("Successfully created");
                setTimeout(() => {
                    navigate('/events')
                }, 1000)
            } catch (err) {
                setError(err)
            }
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
                                <MDTypography
                                    sx={{ margin: '20px' }}
                                    variant="h6"
                                    fontWeight="medium"
                                    textTransform="capitalize"
                                >
                                    Create Event
                                </MDTypography>
                                <form>
                                    <Box p={2}>
                                        <TextField
                                            name="title"
                                            label="Title"
                                            type="text"
                                            value={formData.title}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Box>
                                    <Box p={2}>
                                        <TextField
                                            name="date"
                                            type="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Box>
                                    <Box p={2}>
                                        <TextField
                                            name="sport"
                                            label="Sport"
                                            type="text"
                                            value={formData.sport}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Box>
                                    <Box p={2}>
                                        <TextField
                                            name="location"
                                            label="Location"
                                            type="text"
                                            value={formData.location}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Box>
                                    <Box p={2}>
                                        <TextField
                                            name="description"
                                            label="Description"
                                            type="text"
                                            value={formData.description}
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
                                        type="text"
                                        value={formData.outcome}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Box>
                                <Box p={2}>
                                    <TextField
                                        name="team1"
                                        label="Team1"
                                        type="text"
                                        value={formData.team1}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Box>
                                <Box p={2}>
                                    <TextField
                                        name="team2"
                                        label="Team2"
                                        type="text"
                                        value={formData.team2}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Box>
                                <MDButton
                                    sx={{ margin: '20px' }}
                                    variant="gradient"
                                    color="dark"
                                    onClick={handleSubmit}
                                >
                                    Create
                                </MDButton>
                                <p style={{ fontSize: "12px", paddingX: "20px" }}>{message ? message : null}</p>
                                <p style={{ fontSize: "12px", paddingX: "20px", color: "red" }}>{error ? error : null}</p>
                            </MDBox>
                            <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <MDBox mb={2} />

        </DashboardLayout>
    );
}

export default AddEvents;
