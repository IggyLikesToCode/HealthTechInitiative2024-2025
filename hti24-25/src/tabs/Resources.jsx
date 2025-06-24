import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Link,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const Resources = () => {
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 4, sm: 6, md: 8 },
        backgroundColor: "#f0f7ff",
        minHeight: "100vh",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Typography
        variant="h3"
        fontWeight="700"
        gutterBottom
        sx={{ color: "#1e40af", mb: 6, textAlign: "center" }}
      >
        Resources
      </Typography>

      <Grid container spacing={6} justifyContent="center" alignItems="flex-start">
        <Grid item xs={12} md={6}>
          <Paper
            elevation={5}
            sx={{
              p: 5,
              borderRadius: 3,
              backgroundColor: "#ffffff",
              boxShadow: "0 8px 20px rgba(30,64,175,0.15)",
            }}
          >
            <Typography variant="h5" fontWeight="700" sx={{ mb: 3, color: "#1e40af" }}>
              Testing
            </Typography>
            <List dense>
              <ListItem disablePadding>
                <ListItemText>
                  <Link
                    href="https://www.epa.gov/lead/protect-your-family-sources-lead"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ color: "#2563eb", fontWeight: 600, "&:hover": { color: "#1e40af" } }}
                  >
                    Find Lead Testing Kits
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem disablePadding>
                <ListItemText>
                  <Link
                    href="https://www.cdc.gov/nceh/lead/faqs/lead-testing.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ color: "#2563eb", fontWeight: 600, "&:hover": { color: "#1e40af" } }}
                  >
                    How to Test Your Water
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem disablePadding>
                <ListItemText>
                  <Link
                    href="https://www.epa.gov/lead/lead-testing-and-certification"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ color: "#2563eb", fontWeight: 600, "&:hover": { color: "#1e40af" } }}
                  >
                    Certified Labs Near You
                  </Link>
                </ListItemText>
              </ListItem>
            </List>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" fontWeight="700" sx={{ mb: 3, color: "#1e40af" }}>
              Health
            </Typography>
            <List dense>
              <ListItem disablePadding>
                <ListItemText>
                  <Link
                    href="https://www.cdc.gov/nceh/lead/health-effects.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ color: "#2563eb", fontWeight: 600, "&:hover": { color: "#1e40af" } }}
                  >
                    Health Effects of Lead
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem disablePadding>
                <ListItemText>
                  <Link
                    href="https://www.cdc.gov/nceh/lead/prevention/default.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ color: "#2563eb", fontWeight: 600, "&:hover": { color: "#1e40af" } }}
                  >
                    Protecting Children
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem disablePadding>
                <ListItemText>
                  <Link
                    href="https://www.cdc.gov/nceh/lead/default.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ color: "#2563eb", fontWeight: 600, "&:hover": { color: "#1e40af" } }}
                  >
                    CDC Guidelines
                  </Link>
                </ListItemText>
              </ListItem>
            </List>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" fontWeight="700" sx={{ mb: 3, color: "#1e40af" }}>
              Reliable Sources
            </Typography>
            <List dense>
              <ListItem disablePadding>
                <ListItemText>
                  <Link
                    href="https://www.epa.gov/lead"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ color: "#2563eb", fontWeight: 600, "&:hover": { color: "#1e40af" } }}
                  >
                    EPA Lead Resources
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem disablePadding>
                <ListItemText>
                  <Link
                    href="https://www.who.int/news-room/fact-sheets/detail/lead-poisoning-and-health"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ color: "#2563eb", fontWeight: 600, "&:hover": { color: "#1e40af" } }}
                  >
                    WHO on Lead Exposure
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem disablePadding>
                <ListItemText>
                  <Link
                    href="https://www.ncbi.nlm.nih.gov/pmc/?term=lead+poisoning"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ color: "#2563eb", fontWeight: 600, "&:hover": { color: "#1e40af" } }}
                  >
                    NIH Articles
                  </Link>
                </ListItemText>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Typography variant="h5" fontWeight="700" sx={{ mb: 3, color: "#1e40af" }}>
            Recent News
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Paper
              elevation={4}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "#ffffff",
                boxShadow: "0 6px 15px rgba(30,64,175,0.12)",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 24px rgba(30,64,175,0.25)",
                },
              }}
            >
              <Typography variant="subtitle1" fontWeight="700" gutterBottom>
                <Link
                  href="https://www.nytimes.com/2023/10/04/us/milwaukee-lead-pipes.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{ color: "#2563eb", "&:hover": { color: "#1e40af" } }}
                >
                  City Launches New Water Testing Initiative
                </Link>
              </Typography>
              <Typography variant="caption" color="text.secondary" fontStyle="italic">
                by John Doe · April 10, 2025
              </Typography>
            </Paper>

            <Paper
              elevation={4}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "#ffffff",
                boxShadow: "0 6px 15px rgba(30,64,175,0.12)",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 24px rgba(30,64,175,0.25)",
                },
              }}
            >
              <Typography variant="subtitle1" fontWeight="700" gutterBottom>
                <Link
                  href="https://www.nbcnews.com/news/us-news/lead-water-schools-epa-rule-rcna110529"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{ color: "#2563eb", "&:hover": { color: "#1e40af" } }}
                >
                  Schools Push for Safer Drinking Water
                </Link>
              </Typography>
              <Typography variant="caption" color="text.secondary" fontStyle="italic">
                by Jane Smith · April 8, 2025
              </Typography>
            </Paper>

            <Paper
              elevation={4}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "#ffffff",
                boxShadow: "0 6px 15px rgba(30,64,175,0.12)",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 24px rgba(30,64,175,0.25)",
                },
              }}
            >
              <Typography variant="subtitle1" fontWeight="700" gutterBottom>
                <Link
                  href="https://www.epa.gov/newsreleases/epa-announces-proposed-rule-remove-lead-pipes"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{ color: "#2563eb", "&:hover": { color: "#1e40af" } }}
                >
                  New Federal Guidelines on Lead Pipes
                </Link>
              </Typography>
              <Typography variant="caption" color="text.secondary" fontStyle="italic">
                by Mike Johnson · April 5, 2025
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Resources;
