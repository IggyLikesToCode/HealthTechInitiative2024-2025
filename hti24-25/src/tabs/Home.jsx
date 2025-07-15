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
import { keyframes } from "@mui/system";

const pulse = keyframes`
    0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.7;
    }
    50% {
        transform: translate(-50%, -50%) scale(1.3);
        opacity: 0.3;
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.7;
    }
`;

const hotspots = [
  { top: "42%", left: "51%" },
  { top: "58%", left: "63.5%" },
  { top: "40%", left: "30%" },
  { top: "50.5%", left: "70.3%" },
  { top: "60%", left: "40%" },
  { top: "26%", left: "26%" },
  { top: "26%", left: "83%" },
  { top: "60%", left: "69%" },
  { top: "65%", left: "54%" },
];

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
            href="/report"
          >
            Report Contamination
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ color: "black", mt: 2, ml: 2 }}
            href="/map"
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
            p: 2,
            position: "relative",
          }}
        >
          <Box
            component="img"
            src="/assets/usmap.png"
            alt="U.S. Lead Contamination Graphic"
            sx={{
              width: "105%",
              height: "105%",
              objectFit: "contain",
            }}
          />
          {hotspots.map((spot, i) => (
            <React.Fragment key={i}>
              <Box
                sx={{
                  position: "absolute",
                  top: spot.top,
                  left: spot.left,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: "#bfdbfe",
                  animation: `${pulse} 2.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: spot.top,
                  left: spot.left,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: "#1d4ed8",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                }}
              />
            </React.Fragment>
          ))}
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
                        800M+
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                        Children Exposed Globally
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4} textAlign="center">
                    <City style={{ color: "#6daff9", fontSize: 50 }} />
                    <Typography variant="h4" fontWeight="bold" color="primary">
                        7,000+
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                        Cities Potentially Affected
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4} textAlign="center">
                    <Warning style={{ color: "#6daff9", fontSize: 50 }} />
                    <Typography variant="h4" fontWeight="bold" color="primary">
                        1,000+
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                        Active Health Alerts
                    </Typography>
                </Grid>
            </Grid>
        </Box>
      </Container>

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
                      width: "300px",
                      height: "300px",
                  }}
              >
                  <Box
                      component="img"
                      src="/assets/Waterdrop.svg"
                      alt="Waterdrop Graphic"
                      sx={{ width: "200%", height: "200%", ml:"-7%" }}
                  />
              </Box>


          </Grid>

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

      <Box sx={{ mt: 4, ml: 10 }}>
        <Typography variant="h3" fontWeight="bold" color="textPrimary" mb={2}>
          Our Partners
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          Thank you to our amazing sponsors and partners who help keep Health
          Tech Initiative running!
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
              {/* staples partner */}
              <Avatar
                  alt="Staples High School"
                  src="/assets/stapleshighschool.png"
                  sx={{
                      width: "10vw",
                      height: "10vw",
                      maxWidth: "110px",
                      maxHeight: "110px",
                  }}
              />

              {/*
              <Avatar
                  alt="Partner 2"
                  sx={{
                      bgcolor: "#6daff9",
                      width: "8vw",
                      height: "8vw",
                      maxWidth: "100px",
                      maxHeight: "100px",
                  }}
              >
                  <User />
              </Avatar>

              {/* Gray circular partner icon */}
              {/*<Avatar
                  alt="Partner 3"
                  sx={{
                      bgcolor: "primary.main",
                      width: "8vw",
                      height: "8vw",
                      maxWidth: "100px",
                      maxHeight: "100px",
                  }}

              >
                  <User />
              </Avatar>*/}

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
