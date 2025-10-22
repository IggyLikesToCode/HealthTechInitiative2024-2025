import React from "react";
import { Container, Typography, Box, TextField, Button, Grid, Avatar } from "@mui/material";
import { MailOutlined, LinkedinOutlined, UserOutlined } from "@ant-design/icons";

export default function Contact() {
    return (
        <Container sx={{ py: 10, textAlign: "center" }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
                Contact Us
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={6}>
                We’d love to hear from you — whether you’re a researcher, educator, or
                would like to reach out with a problem in the website! Reach out to collaborate or learn more about Health Tech Initiative.
            </Typography>

            {/* Contact Cards */}
            <Grid container spacing={4} justifyContent="center" mb={8}>
                {/* Sahil */}
                <Grid item xs={12} sm={6} md={4}>
                    <Box
                        sx={{
                            bgcolor: "#dbeafe",
                            borderRadius: "20px",
                            p: 4,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            sx={{ bgcolor: "#1d4ed8", width: 80, height: 80, mb: 2 }}
                        >
                            <UserOutlined style={{ fontSize: 36, color: "white" }} />
                        </Avatar>
                        <Typography variant="h5" fontWeight="bold">
                            Sahil Vora
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={1}>
                            Co-Founder
                        </Typography>
                        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                            <Button
                                href="mailto:sv1005093@students.westportps.org"
                                startIcon={<MailOutlined />}
                                sx={{ textTransform: "none" }}
                            >
                                Email
                            </Button>
                            <Button
                                href="https://www.linkedin.com/in/sahil-vora-451a96357/"
                                startIcon={<LinkedinOutlined />}
                                sx={{ textTransform: "none" }}
                            >
                                LinkedIn
                            </Button>
                        </Box>
                    </Box>
                </Grid>

                {/* Cofounder */}
                <Grid item xs={12} sm={6} md={4}>
                    <Box
                        sx={{
                            bgcolor: "#dbeafe",
                            borderRadius: "20px",
                            p: 4,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            sx={{ bgcolor: "#1d4ed8", width: 80, height: 80, mb: 2 }}
                        >
                            <UserOutlined style={{ fontSize: 36, color: "white" }} />
                        </Avatar>
                        <Typography variant="h5" fontWeight="bold">
                            Iggy N.
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={1}>
                            Co-Founder
                        </Typography>
                        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                            <Button
                                href="mailto:in1012545@students.westportps.org"
                                startIcon={<MailOutlined />}
                                sx={{ textTransform: "none" }}
                            >
                                Email
                            </Button>
                            <Button
                                href="https://www.linkedin.com/in/ignacy-nieweglowski-707859290/"
                                startIcon={<LinkedinOutlined />}
                                sx={{ textTransform: "none" }}
                            >
                                LinkedIn
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>


        </Container>
    );
}
