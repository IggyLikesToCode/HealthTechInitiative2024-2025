import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper
} from "@mui/material";
import { TeamOutlined, RocketOutlined, GlobalOutlined } from "@ant-design/icons";

const CreateChapter = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Your chapter request has been submitted successfully! We'll get back to you soon.");
        e.target.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Hero Section */}
      <Container sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 4, md: 6 } }}>
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
          >
            Start a Chapter
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: "700px",
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.25rem" }
            }}
          >
            Interested in learning more about creating a Health Tech Initiative Chapter at your school? Fill out the application form below to get started!
          </Typography>
        </Box>

        <Grid
          container
          spacing={15}
          sx={{
            flexDirection: { xs: "column", md: "row" },
            alignItems: "flex-start"
          }}
        >
          <Grid item sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" }, minWidth: 250 }}>
            <Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
              >
                What You'll Do
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                paragraph
                sx={{ mb: 4 }}
              >
                Lead a student run-chapter in your district and make a real impact on your community.
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <Box
                    sx={{
                      bgcolor: "#dbeafe",
                      borderRadius: "12px",
                      p: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 56,
                      height: 56
                    }}
                  >
                    <TeamOutlined style={{ color: "#6daff9", fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Build a Team
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Recruit and lead passionate students at your school who want to make a difference in public health.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <Box
                    sx={{
                      bgcolor: "#dbeafe",
                      borderRadius: "12px",
                      p: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 56,
                      height: 56
                    }}
                  >
                    <RocketOutlined style={{ color: "#6daff9", fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Take Action
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Conduct water testing, organize awareness campaigns, and contribute data to our joint national database.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <Box
                    sx={{
                      bgcolor: "#dbeafe",
                      borderRadius: "12px",
                      p: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 56,
                      height: 56
                    }}
                  >
                    <GlobalOutlined style={{ color: "#6daff9", fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Join the Network
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Connect with other chapters, access resources, and receive support from our founding team.
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mt: 4, p: 3, bgcolor: "#f3f4f6", borderRadius: "12px" }}>
                <Typography variant="body2" color="text.secondary">
                  Questions? Email us at{" "}
                  <a
                    href="mailto:healthtech.initiative.ct@gmail.com"
                    style={{ color: "#6daff9", textDecoration: "none", fontWeight: 600 }}
                  >
                    leadwatchhti@gmail.com
                  </a>
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item sx={{ flex: { xs: "1 1 100%", md: "1 1 55%" }, minWidth: 300 }}>
            <Paper sx={{ p: { xs: 3, md: 4 } }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
              >
                Chapter Application
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Fill out the form below and we'll reach out to help you get started!
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2
                }}
              >
                <TextField
                  label="Full Name"
                  type="text"
                  name="name"
                  fullWidth
                  required
                  variant="outlined"
                />

                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  fullWidth
                  required
                  variant="outlined"
                />

                <TextField
                  label="School Name"
                  type="text"
                  name="school"
                  fullWidth
                  required
                  variant="outlined"
                />

                <TextField
                  label="School Location (City, State)"
                  type="text"
                  name="location"
                  fullWidth
                  required
                  variant="outlined"
                />

                <TextField
                  label="Grade Level"
                  type="text"
                  name="grade"
                  fullWidth
                  required
                  variant="outlined"
                  placeholder="e.g., 10th Grade"
                />

                <TextField
                  label="Why do you want to start a chapter?"
                  name="reason"
                  fullWidth
                  required
                  multiline
                  rows={3}
                  variant="outlined"
                  placeholder="Tell us about your motivation..."
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontWeight: "bold",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    color: "white",
                    mt: 1
                  }}
                >
                  Submit Application
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CreateChapter;