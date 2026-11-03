import React, { useState } from "react";
import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Toolbar,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

const NAVY = "#0B2B4A";
const FONT = '"Avenir Next", Avenir, "Helvetica Neue", Arial, sans-serif';

const navItems = [
    { label: "Home", path: "/" },
    { label: "Report", path: "/report" },
    { label: "Data", path: "/map" },
    { label: "Schools", path: "/chapters" },
    { label: "Contact", path: "/contact" },
];

const Navbar = () => {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: "#FFFFFF",
                color: NAVY,
                borderBottom: "1px solid rgba(11,43,74,0.08)",
            }}
        >
            <Container maxWidth={false} sx={{ maxWidth: "1240px !important" }}>
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: { xs: 74, md: 88 },
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        component={RouterLink}
                        to="/"
                        onClick={() => setMobileOpen(false)}
                        aria-label="Health Tech Initiative home"
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            color: NAVY,
                            textDecoration: "none",
                        }}
                    >
                        <Box
                            component="img"
                            src="/assets/Logo_B&W.png"
                            alt="Health Tech Initiative"
                            sx={{
                                width: { xs: 118, md: 145 },
                                height: { xs: 46, md: 55 },
                                objectFit: "contain",
                                objectPosition: "left center",
                            }}
                        />
                    </Box>

                    <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.65 }}>
                        {navItems.map((item) => {
                            const active = location.pathname === item.path;

                            return (
                                <Button
                                    key={item.label}
                                    component={RouterLink}
                                    to={item.path}
                                    sx={{
                                        px: 1.65,
                                        minWidth: "auto",
                                        color: NAVY,
                                        fontFamily: FONT,
                                        textTransform: "none",
                                        fontSize: "0.98rem",
                                        fontWeight: active ? 700 : 500,
                                        borderRadius: 0,
                                        position: "relative",
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            left: "18%",
                                            right: "18%",
                                            bottom: 4,
                                            height: 2,
                                            bgcolor: active ? NAVY : "transparent",
                                            transform: active ? "scaleX(1)" : "scaleX(0)",
                                            transition: "transform 180ms ease",
                                        },
                                        "&:hover": {
                                            bgcolor: "transparent",
                                            "&::after": {
                                                bgcolor: NAVY,
                                                transform: "scaleX(1)",
                                            },
                                        },
                                    }}
                                >
                                    {item.label}
                                </Button>
                            );
                        })}
                    </Box>

                    <IconButton
                        aria-label="Toggle navigation menu"
                        onClick={() => setMobileOpen((open) => !open)}
                        sx={{
                            display: { xs: "inline-flex", md: "none" },
                            color: NAVY,
                            fontSize: "1.7rem",
                        }}
                    >
                        {mobileOpen ? "×" : "☰"}
                    </IconButton>
                </Toolbar>

                {mobileOpen && (
                    <Box
                        sx={{
                            display: { xs: "flex", md: "none" },
                            flexDirection: "column",
                            alignItems: "stretch",
                            pb: 2,
                            borderTop: "1px solid rgba(11,43,74,0.08)",
                        }}
                    >
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                component={RouterLink}
                                to={item.path}
                                onClick={() => setMobileOpen(false)}
                                sx={{
                                    justifyContent: "flex-start",
                                    py: 1.35,
                                    color: NAVY,
                                    fontFamily: FONT,
                                    textTransform: "none",
                                    fontWeight: location.pathname === item.path ? 700 : 500,
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                )}
            </Container>
        </AppBar>
    );
};

export default Navbar;
