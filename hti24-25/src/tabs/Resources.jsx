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
} from "@mui/material";

const Resources = () => {
  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Resources
      </Typography>

      <Grid container spacing={4} justifyContent={"space-between"}>
        <Grid width={"50%"} item md={6}>
          <Box
            sx={{
              backgroundColor: "#dbeafe",
              borderRadius: 4,
              p: 4,
              height: "100%",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Testing
            </Typography>
            <List>
              <ListItem>
                <ListItemText>
                  <Link
                    href="https://www.epa.gov/lead/protect-your-family-sources-lead"
                    target="_blank"
                    rel="noopener noreferrer"
                    component="a"
                    underline="hover"
                  >
                    Find Lead Testing Kits
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link
                    href="https://www.cdc.gov/nceh/lead/faqs/lead-testing.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                    component="a"
                    underline="hover"
                  >
                    How to Test Your Water
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link
                    href="https://www.epa.gov/lead/lead-testing-and-certification"
                    target="_blank"
                    rel="noopener noreferrer"
                    component="a"
                    underline="hover"
                  >
                    Certified Labs Near You
                  </Link>
                </ListItemText>
              </ListItem>
            </List>

            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{ mt: 4 }}
            >
              Health
            </Typography>
            <List>
              <ListItem>
                <ListItemText>
                  <Link
                    href="https://www.cdc.gov/nceh/lead/health-effects.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                    component="a"
                    underline="hover"
                  >
                    Health Effects of Lead
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link
                    href="https://www.cdc.gov/nceh/lead/prevention/default.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                    component="a"
                    underline="hover"
                  >
                    Protecting Children
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link
                    href="https://www.cdc.gov/nceh/lead/default.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                    component="a"
                    underline="hover"
                  >
                    CDC Guidelines
                  </Link>
                </ListItemText>
              </ListItem>
            </List>

            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{ mt: 4 }}
            >
              Reliable Sources
            </Typography>
            <List>
              <ListItem>
                <ListItemText>
                  <Link
                    href="https://www.epa.gov/lead"
                    target="_blank"
                    rel="noopener noreferrer"
                    component="a"
                    underline="hover"
                  >
                    EPA Lead Resources
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link
                    href="https://www.who.int/news-room/fact-sheets/detail/lead-poisoning-and-health"
                    target="_blank"
                    rel="noopener noreferrer"
                    component="a"
                    underline="hover"
                  >
                    WHO on Lead Exposure
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link
                    href="https://www.ncbi.nlm.nih.gov/pmc/?term=lead+poisoning"
                    target="_blank"
                    rel="noopener noreferrer"
                    component="a"
                    underline="hover"
                  >
                    NIH Articles
                  </Link>
                </ListItemText>
              </ListItem>
            </List>
          </Box>
        </Grid>

        <Grid item md={6} width={"45%"}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Recent News
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                <Link
                  href="https://www.nytimes.com/2023/10/04/us/milwaukee-lead-pipes.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  component="a"
                  underline="hover"
                >
                  City Launches New Water Testing Initiative
                </Link>
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                fontStyle="italic"
              >
                by John Doe · April 10, 2025
              </Typography>
            </Paper>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                <Link
                  href="https://www.nbcnews.com/news/us-news/lead-water-schools-epa-rule-rcna110529"
                  target="_blank"
                  rel="noopener noreferrer"
                  component="a"
                  underline="hover"
                >
                  Schools Push for Safer Drinking Water
                </Link>
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                fontStyle="italic"
              >
                by Jane Smith · April 8, 2025
              </Typography>
            </Paper>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                <Link
                  href="https://www.epa.gov/newsreleases/epa-announces-proposed-rule-remove-lead-pipes"
                  target="_blank"
                  rel="noopener noreferrer"
                  component="a"
                  underline="hover"
                >
                  New Federal Guidelines on Lead Pipes
                </Link>
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                fontStyle="italic"
              >
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
