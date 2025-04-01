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
  Breadcrumbs
  , Link
} from "@mui/material";

const Home = () => {
  //use routes for redirecting
  return (
    <div>
      {/* Hero Section */}
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 10,
        }}
      >
        {/* Left Side - Text */}
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
          {/* Replace with an actual image */}
          <Typography variant="h5" color="primary">
            [Graphic Placeholder]
          </Typography>
        </Box>
      </Container>

      {/* Info Cards Section */}
      <Container sx={{ py: 5 }}>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              title: "Report Issues",
              text: "Submit contamination reports easily with our streamlined process.",
            },
            {
              title: "View Data",
              text: "Explore real-time contamination data across the country.",
            },
            {
              title: "Take Action",
              text: "Find resources on how to protect your community.",
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ textAlign: "center", p: 2 }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {item.text}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
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
