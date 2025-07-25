import React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  TextField,
  Button
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
            alignItems: "flex-start",
            pt: "8vh"
          }}
      >
        <Box
            sx={{
              width:"45%"
            }}
        >
          <CardContent sx={{ p: { xs: 4, sm: 6 } }}>
            <Typography variant="h4" align="center" gutterBottom>
              Request a Lead Kit
            </Typography>
            <Box
            component="form"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  mt: 3,
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
                  label="Mailing Address"
                  type="text"
                  name="address"
                  fullWidth
                  required
                  variant="outlined"
              />
              <TextField
              label="Reason for Request (optional)"
              name="reason"
              InputLabelProps={{ shrink: true }}
              fullWidth
              rows={5}
              variant="outlined"
              />


              <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSubmit}
                  sx={{
                    py: .5,
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    color:"white"
                  }}
              >
                Submit Report
              </Button>
            </Box>
          </CardContent>
        </Box>
      </Box>
  );
};

export default TestKits;
