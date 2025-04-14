import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Breadcrumbs,
  Link,
  Avatar,
} from "@mui/material";
import {
  UserOutlined as User,
  WarningOutlined as Warning,
  HomeOutlined as City,
} from "@ant-design/icons";

const Home = () => {
  return (
    <div>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 10,
        }}
      >
        <Box sx={{ width: "50%" }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Tracking Lead Contamination, Protecting Communities
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            A nationwide open-source database to report and visualize lead
            contamination data.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ color: "white", mt: 2 }}
          >
            Report Contamination
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ color: "black", mt: 2, ml: 2 }}
          >
            View Data
          </Button>
        </Box>

        <Box
          sx={{
            width: "45%",
            height: "300px",
            backgroundColor: "#dbeafe",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" color="primary">
            [Graphic Placeholder]
          </Typography>
        </Box>
      </Container>

      <Container
        disableGutters
        maxWidth={false}
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 1,
        }}
      >
        <Box
          sx={{
            width: "95%",
            height: "auto",
            backgroundColor: "#dbeafe",
            borderRadius: "20px",
            p: 4,
          }}
        >
          <Grid container spacing={4} justifyContent="space-around">
            <Grid item xs={12} sm={4} textAlign="center">
              <User style={{ color: "#6daff9", fontSize: 50 }} />
              <Typography variant="h4" fontWeight="bold" color="primary">
                2.3M+
              </Typography>
              <Typography variant="subtitle1" color="primary">
                People Affected
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4} textAlign="center">
              <City style={{ color: "#6daff9", fontSize: 50 }} />
              <Typography variant="h4" fontWeight="bold" color="primary">
                1,250+
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Cities Reported
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} textAlign="center">
              <Warning style={{ color: "#6daff9", fontSize: 50 }} />
              <Typography variant="h4" fontWeight="bold" color="primary">
                780
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Active Warnings
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* --- OUR MISSION --- */}

      <Container sx={{ alignItems: "center", width: "100%", mr: 6 }}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{
            py: 10,
            px: 4,
            borderRadius: "32px",
            width: "90%",
          }}
        >
          <Grid item md={6}>
            <Box
              sx={{
                height: 280,
                background: "#dbeafe",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                color: "#6daff9",
                fontWeight: 600,
                width: "300px",
                height: "300px",
              }}
            >
              <Typography>[Graphic]</Typography>
            </Box>
          </Grid>

          {/* TEXT RIGHT */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              fontWeight="bold"
              color="textPrimary"
              gutterBottom
            >
              Our Mission
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: "600px", mb: 2 }}
            >
              Empowering every community with data to uncover and eliminate lead
              exposure risks.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: "600px" }}
            >
              We believe no child should grow up drinking contaminated water.
              Our mission is to build the most comprehensive, accessible, and
              transparent platform for lead reporting in the United States.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* --- OUR PARTNERS --- */}
      <Box sx={{ mt: 4, ml: 10 }}>
        <Typography variant="h3" fontWeight="bold" color="textPrimary" mb={2}>
          Our Partners
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          Collaborating with trusted organizations across public health,
          education, and tech.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 5,
            overflowX: "auto",
            pb: 2,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Avatar
            alt="Partner 1"
            sx={{ bgcolor: "primary", width: 80, height: 80 }}
          >
            <User></User>
          </Avatar>
          <Avatar
            alt="Partner 1"
            sx={{ bgcolor: "#6daff9", width: 80, height: 80 }}
          >
            <User></User>
          </Avatar>
          <Avatar
            alt="Partner 1"
            sx={{ bgcolor: "primary", width: 80, height: 80 }}
          >
            <User></User>
          </Avatar>
        </Box>
      </Box>

      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          borderTop: "2px solid #ddd",
          color: "#666",
        }}
      >
        &copy; 2025 Health Tech Initiative. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
