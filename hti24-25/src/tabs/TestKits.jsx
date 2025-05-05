import React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const TestKits = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f0f4ff", // subtle background
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 8,
      }}
    >
      <Card
        sx={{
          width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" },
          borderRadius: "32px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent sx={{ p: { xs: 4, sm: 6 } }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            align="center"
            gutterBottom
          >
            Request a Free Lead Test Kit
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            mb={4}
          >
            Fill out this form and we’ll review your request. If approved, we’ll
            send you a free kit to test your water for lead contamination.
          </Typography>

          <Box
            component="form"
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              required
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              required
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Mailing Address"
              name="address"
              multiline
              rows={2}
              required
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Reason for Request (optional)"
              name="reason"
              multiline
              rows={3}
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              Submit Request
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TestKits;
