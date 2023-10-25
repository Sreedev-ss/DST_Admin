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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// Images
import { Box, Card, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import MDButton from "components/MDButton";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditUser() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/user/getSingleUserById/${id}`);
                const userData = res?.data?.user;
                setUser(userData);
                setFormData({
                    username: userData?.username || "",
                    fullname: userData?.fullname || "",
                    email: userData?.email || "",
                    nation: userData?.nation || "",
                    mobile: userData?.mobile || "",
                    balance: userData?.balance || "",
                    accountStatus: userData?.accountStatus || "",
                });

            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };

        fetchData();
    }, [id]);

    const [err, setErr] = useState(null)
    const [message, setMessage] = useState(null)
    const [formData, setFormData] = useState({
        username: "",
        fullname: "",
        email: "",
        nation: "",
        mobile: "",
        balance: "",
        accountStatus: ""
    });
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const selectStyle = {
        height: '50px', 
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(`http://localhost:4000/api/user/updateUser/${id}`, formData);
            const mess = res?.data?.message;
            toast.success("User Updated");
            setTimeout(()=>{
                navigate('/users')
            },1000)
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
                                <MDTypography 
                                    sx={{ margin: '20px' }} 
                                    variant="h6" 
                                    fontWeight="medium" 
                                    textTransform="capitalize"
                                >
                                    General Information
                                </MDTypography>
                                <form>
                                    <Box p={2}>
                                        <TextField
                                            label="User name"
                                            name="username"
                                            value={formData?.username}
                                            type="text"
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Box>
                                    <Box p={2}>
                                        <TextField
                                            label="Full name"
                                            name="fullname"
                                            value={formData?.fullname}
                                            type="text"
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Box>
                                    <Box p={2}>
                                        <TextField
                                            label="Email"
                                            name="email"
                                            value={formData?.email}
                                            type="email"
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
                                        label="Balance"
                                        name="balance"
                                        value={formData?.balance}
                                        type="text"
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Box>
                                <Box p={2}>
                                    <TextField
                                        label="Mobile"
                                        name="mobile"
                                        value={formData?.mobile}
                                        type="text"
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Box>
                                <Box p={2}>
                                    <TextField
                                        label="Nation"
                                        name="nation"
                                        value={formData?.nation}
                                        type="text"
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Box>
                                <Box p={2}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Account Status</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="accountStatus"
                                            value={formData?.accountStatus}
                                            label="Account Status"
                                            onChange={handleChange}
                                            style={selectStyle}
                                        >
                                            <MenuItem value={"active"}>Active</MenuItem>
                                            <MenuItem value={"banned"}>Banned</MenuItem>
                                            <MenuItem value={"suspended"}>Suspended</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <MDButton 
                                    sx={{ margin: '20px' }} 
                                    variant="gradient" 
                                    color="dark" 
                                    onClick={handleSubmit} 
                                >
                                    Update
                                </MDButton>
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

export default EditUser;
