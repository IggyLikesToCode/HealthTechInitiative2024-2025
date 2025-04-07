import { AppBar, Toolbar, Typography, Breadcrumbs, Link } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" color="background" elevation={0}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Health Tech Initiative
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            href="/"
            sx={{ color: "primary" }}
          >
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/map">
            Data
          </Link>
          <Link underline="hover" color="inherit" href="/report">
            Report
          </Link>
          <Link underline="hover" color="inherit" href="/TestKits">
            Test Kits
          </Link>
          <Link underline="hover" color="inherit" href="/Resources">
            Resources
          </Link>
        </Breadcrumbs>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
