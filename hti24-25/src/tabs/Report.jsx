import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  Stack,
  IconButton,
  Divider,
  Paper,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  backgroundColor: "#f3f3f3",
};

const Report = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [level, setLevel] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async () => {
    try {
      const locationIqKey = "pk.4e7d542fb27c753e173543c95bf667e6";
      const geoRes = await axios.get(
        `https://us1.locationiq.com/v1/search.php?key=${locationIqKey}&q=${encodeURIComponent(
          location
        )}&format=json`
      );

      const { lat, lon } = geoRes.data[0];

      const payload = {
        location_name: location,
        level: parseFloat(level),
        date,
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        reported_by: "anonymous",
      };

      const res = await axios.post(
        "http://localhost:3001/api/report-lead",
        payload
      );

      if (res.data.success) {
        alert("✅ Lead report submitted!");
        setModalOpen(false);
        setLocation("");
        setLevel("");
        setDate("");
      } else {
        alert("❌ Submission failed.");
      }
    } catch (err) {
      console.error("Error submitting lead report:", err);
      alert("❌ Error submitting lead report.");
    }
  };

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Report Lead Contamination
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
        sx={{ mb: 4 }}
      >
        Submit a Report
      </Button>

      <Paper
        elevation={2}
        sx={{ p: 4, backgroundColor: "#dbeafe", borderRadius: 3 }}
      >
        <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
          Why Reporting Matters
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi leo
          risus, porta ac consectetur ac, vestibulum at eros. Sed posuere
          consectetur est at lobortis.
        </Typography>
      </Paper>

      <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={modalStyle}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" color="primary">
              New Lead Report
            </Typography>
            <IconButton onClick={() => setModalOpen(false)}>
              <Typography color="textSecondary">X</Typography>
            </IconButton>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Stack spacing={2}>
            <TextField
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
            />
            <TextField
              label="Lead Level (ppm)"
              type="number"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              fullWidth
            />
            <TextField
              label="Date Tested"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <Box display="flex" justifyContent="flex-end" gap={1}>
              <Button onClick={() => setModalOpen(false)} color="inherit">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
};

export default Report;
