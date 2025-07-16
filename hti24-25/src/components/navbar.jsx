import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    useTheme,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

const navItems = [
    { label: "Home", path: "/" },
    { label: "Data", path: "/map" },
    { label: "Report", path: "/report" },
    { label: "Test Kits", path: "/testkits" },
];

const Navbar = () => {
    const theme = useTheme();
    const location = useLocation();

    return (
        <AppBar
            position="sticky"
            color="default" // gives it a proper solid background
            elevation={0}
            sx={{
                boxShadow: "none",
                px: { xs: 2, sm: 4 },
                py: 1.5,
                borderBottom: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.default, // solid background
            }}
        >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                    variant="h6"
                    component={RouterLink}
                    to="/"
                    sx={{
                        textDecoration: "none",
                        color: "text.primary",
                        fontWeight: 600,
                        fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    }}
                >
                    Health Tech Initiative
                </Typography>

                <Box sx={{ display: "flex", gap: { xs: 1.2, sm: 2 } }}>
                    {navItems.map(({ label, path }) => {
                        const isActive = location.pathname === path;
                        return (
                            <Button
                                key={label}
                                component={RouterLink}
                                to={path}
                                sx={{
                                    textTransform: "none",
                                    fontWeight: isActive ? 600 : 500,
                                    fontSize: "1rem",
                                    color: isActive
                                        ? theme.palette.primary.main
                                        : theme.palette.text.primary,
                                    borderBottom: isActive
                                        ? `2px solid ${theme.palette.primary.main}`
                                        : "2px solid transparent",
                                    borderRadius: 0,
                                    transition: "all 0.2s",
                                    "&:hover": {
                                        color: theme.palette.primary.main,
                                        backgroundColor: "transparent",
                                        transform: "scale(1.03)",
                                    },
                                }}
                            >
                                {label}
                            </Button>
                        );
                    })}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
