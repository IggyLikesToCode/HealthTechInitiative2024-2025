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
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          py: { xs: 4, md: 10 },
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "50%" }, mb: { xs: 4, md: 0 } }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: "1.75rem", md: "3rem" } }}>
            Tracking Lead Contamination, Protecting Communities
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}>
            A nationwide open-source database to report and visualize lead
            contamination data.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ color: "white" }}
              href="/report"
              fullWidth={{ xs: true, sm: false }}
            >
              Report Contamination
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ color: "black" }}
              href="/map"
              fullWidth={{ xs: true, sm: false }}
            >
              View Data
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "45%" },
            height: { xs: "250px", md: "300px" },
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
            p: { xs: 2, md: 4 },
          }}
        >
            <Grid container spacing={4} justifyContent="space-around">
                <Grid item xs={12} sm={4} textAlign="center">
                    <User style={{ color: "#6daff9", fontSize: 50 }} />
                    <Typography variant="h4" fontWeight="bold" color="primary" sx={{ fontSize: { xs: "1.5rem", md: "2.125rem" } }}>
                        800M+
                    </Typography>
                    <Typography variant="subtitle1" color="primary" sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                        Children Exposed Globally
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4} textAlign="center">
                    <City style={{ color: "#6daff9", fontSize: 50 }} />
                    <Typography variant="h4" fontWeight="bold" color="primary" sx={{ fontSize: { xs: "1.5rem", md: "2.125rem" } }}>
                        7,000+
                    </Typography>
                    <Typography variant="subtitle1" color="primary" sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                        Cities Potentially Affected
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4} textAlign="center">
                    <Warning style={{ color: "#6daff9", fontSize: 50 }} />
                    <Typography variant="h4" fontWeight="bold" color="primary" sx={{ fontSize: { xs: "1.5rem", md: "2.125rem" } }}>
                        1,000+
                    </Typography>
                    <Typography variant="subtitle1" color="primary" sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                        Active Health Alerts
                    </Typography>
                </Grid>
            </Grid>
        </Box>
      </Container>

      <Container sx={{ alignItems: "center", width: "100%", mr: { xs: 0, md: 6 } }}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{
            py: { xs: 4, md: 10 },
            px: { xs: 2, md: 4 },
            borderRadius: "32px",
            width: { xs: "100%", md: "90%" },
          }}
        >
          <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center", mb: { xs: 4, md: 0 } }}>
              <Box
                  sx={{
                      background: "#dbeafe",
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: { xs: "250px", md: "300px" },
                      height: { xs: "250px", md: "300px" },
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
              sx={{ fontSize: { xs: "1.75rem", md: "3rem" } }}
            >
              Our Mission
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: "600px", mb: 2, fontSize: { xs: "1rem", md: "1.25rem" } }}
            >
              We're a student run research organization started at Staples High School in Westport, CT. Health Tech Initiative was founded in 2024 to help students get involved in hands on community projects that leverage technology for social good. 
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: "600px" }}
            >
              Lead Watch was created to better map the scope of the lead contamination crisis in the United States and help raise awareness through student advocacy. Through community testing, our open source database and outreach aims to help communities know what they're drinking.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ mt: 4, ml: { xs: 2, md: 10 }, mr: { xs: 2, md: 0 } }}>
        <Typography variant="h3" fontWeight="bold" color="textPrimary" mb={2} sx={{ fontSize: { xs: "1.75rem", md: "3rem" } }}>
          Our Partners
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4} sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}>
          Thank you to our amazing sponsors and partners who help keep Health
          Tech Initiative running! If you'd like to reach out and support our work, please email us at healthtech.initiative.ct@gmail.com.
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
            <a href="https://shs.westportps.org/" target="_blank" rel="noopener noreferrer">
              <Avatar
                  alt="Staples High School"
                  src="/assets/stapleshighschool.png"
                  sx={{
                      width: "10vw",
                      height: "10vw",
                      maxWidth: "110px",
                      maxHeight: "110px",
                      minWidth: "80px",
                      minHeight: "80px",
                  }}
              />
              </a>
              <a href="https://www.noahsystem.co/" target="_blank" rel="noopener noreferrer">
              <Avatar
                  alt="Noah System"
                  src="/assets/noahsystems.png"
                  
                  sx={{
                      width: "30vw",
                      height: "30vw",
                      maxWidth: "220px",
                      maxHeight: "110px",
                      minWidth: "80px",
                      minHeight: "80px",
                      borderRadius: 0,

                  }}
              />
              </a>

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
