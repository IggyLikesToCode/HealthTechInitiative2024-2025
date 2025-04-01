import { AppBar, Toolbar, Typography, Breadcrumbs, Link } from "@mui/material";
import React from "react";

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
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Data
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Report
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Test Kits
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Resources
          </Link>
        </Breadcrumbs>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
