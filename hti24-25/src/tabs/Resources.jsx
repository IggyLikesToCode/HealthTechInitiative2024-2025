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
                  <Link href="#" target="_blank">
                    Find Lead Testing Kits
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link href="#" target="_blank">
                    How to Test Your Water
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link href="#" target="_blank">
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
                  <Link href="#" target="_blank">
                    Health Effects of Lead
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link href="#" target="_blank">
                    Protecting Children
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link href="#" target="_blank">
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
                  <Link href="#" target="_blank">
                    EPA Lead Resources
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link href="#" target="_blank">
                    WHO on Lead Exposure
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link href="#" target="_blank">
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
                <Link href="#" target="_blank" underline="hover">
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
                <Link href="#" target="_blank" underline="hover">
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
                <Link href="#" target="_blank" underline="hover">
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
