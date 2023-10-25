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

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Header from "../Header";
import DataTable from "examples/Tables/DataTable";
import projectsTableData from "layouts/tables/data/projectsTableData";
import authorsTableData from "layouts/tables/data/authorsTableData";
import { Button, Grid, TextField } from "@mui/material";
import MDButton from "components/MDButton";
import { Navigate, useNavigate } from "react-router-dom";

function PlatformSettings() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [sports, setSports] = useState(true)
  const [casino, setCasino] = useState(false)
  const navigate = useNavigate()
  return (
    <Card sx={{ boxShadow: "none" }}>
      <MDBox>
        <Grid xs={12} lg={12} sx={{ display: "flex", justifyContent: "space-between", paddingX: "20px" }}>
            <MDBox height="100%" mt={2} lineHeight={1}>
              <MDButton variant={sports?"gradient":"outlined"} color="dark" sx={{marginX: "10px"}} onClick={() => {setSports(true),setCasino(false)}} >
                Sports
              </MDButton>
              <MDButton variant={casino?"gradient":"outlined"} color="dark" onClick={() => {setSports(false),setCasino(true)}}>
                Casino
              </MDButton>
            </MDBox>
            <MDBox height="100%" mt={2} lineHeight={1}>
              <MDButton variant="outlined" color="error" sx={{marginX: "10px"}} onClick={()=>{navigate('/user-history')}}>
                User History
              </MDButton>
              <MDButton variant="outlined" color="warning" onClick={()=>{navigate('/user-authentication')}}>
                User Authentication
              </MDButton>
            </MDBox>
        </Grid>
      </MDBox>
      <MDBox p={2}>
        <MDTypography sx={{ padding: "20px" }} variant="h6" fontWeight="medium" textTransform="capitalize">
          {sports?"sports":"casino"}
        </MDTypography>
        <Grid item xs={12} lg={12}>
          <Card sx={{ height: "100%" }}>
            <MDBox pt={3}>
            {sports ? (
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              ) : (
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              )}
            </MDBox>
          </Card>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default PlatformSettings;
