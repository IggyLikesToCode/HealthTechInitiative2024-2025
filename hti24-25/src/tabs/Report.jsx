import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  Stack,
  InputLabel,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import { CameraOutlined as Camera } from "@ant-design/icons";
const BASE_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:3001"
        : "http://3.149.241.113:3001"; // your EC2 IP or domain here

const Report = () => {
  const [location, setLocation] = useState("");
  const [level, setLevel] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);

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

      const res = await axios.post(`${BASE_URL}/api/report-lead`, payload);

      if (res.data.success) {
        const reportId = res.data.reportId;

        if (file) {
          const formData = new FormData();
          formData.append("image", file);
          formData.append("reportId", reportId);

          const uploadRes = await axios.post(`${BASE_URL}/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (uploadRes.data.success) {
            alert("Report and image uploaded successfully!");
          } else {
            alert("Report submitted, but image upload failed.");
          }
        } else {
          alert("Report submitted successfully!");
        }

        // Reset form
        setLocation("");
        setLevel("");
        setDate("");
        setFile(null);
      } else {
        alert("Report submission failed.");
      }
    } catch (err) {
      console.error("Error submitting lead report:", err);
      alert("Error submitting lead report.");
    }
  };


  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Report Lead Contamination
      </Typography>

      <Box
        sx={{
          maxWidth: 1000,
          mx: "auto",
          mt: 6,
          p: 4,
          borderRadius: 4,
          backgroundColor: "#dbeafe",
        }}
      >
        <Stack spacing={3}>
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            InputProps={{ sx: { backgroundColor: "white", borderRadius: 1 } }}
          />
          <TextField
            label="Lead Level (ppm)"
            type="number"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            fullWidth
            InputProps={{ sx: { backgroundColor: "white", borderRadius: 1 } }}
          />
          <TextField
            label="Date Tested"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            InputProps={{ sx: { backgroundColor: "white", borderRadius: 1 } }}
          />

          <Box>
            <InputLabel sx={{ mb: 1 }}>
              Upload Lead Test Photo (Optional)
            </InputLabel>

            <Camera sx={{ color: "#60a5fa", mr: 1 }} />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ flex: 1, border: "none", outline: "none" }}
            />
          </Box>

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ color: "white", px: 4 }}
            >
              Submit Report
            </Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default Report;
