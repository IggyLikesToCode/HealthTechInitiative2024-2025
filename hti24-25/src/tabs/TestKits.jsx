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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:3001/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Your request has been sent successfully.");
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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 8,
      }}
    >
      <Card
        sx={{
          width: { xs: "95%", sm: "90%", md: "80%", lg: "70%" },
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
            onSubmit={handleSubmit}
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
