import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  TextField,
  Button,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

const BASE_URL = window.location.hostname === "localhost"
    ? "http://localhost:3001"
    : "http://18.217.211.7:3001";



const Report = () => {
  const [location, setLocation] = useState("");
  const [level, setLevel] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async () => {
    try {
      const locationIqKey = "pk.4e7d542fb27c753e173543c95bf667e6";
      const geoRes = await axios.get(
          `https://us1.locationiq.com/v1/search.php?key=${locationIqKey}&q=${encodeURIComponent(location)}&format=json`
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
      <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            pt: "8vh"
          }}
      >
        <Card
            sx={{
              width: { xs: "95%", sm: "85%", md: "70%", lg: "60%" },
              borderRadius: "32px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
            }}
        >
          <CardContent sx={{ p: { xs: 4, sm: 6 } }}>
            <Typography variant="h3" fontWeight="bold" align="center" gutterBottom>
              Report Lead Contamination
            </Typography>
            <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  mt: 3,
                }}
            >
              <TextField
                  label="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  fullWidth
                  required
                  variant="outlined"
              />
              <TextField
                  label="Lead Level (ppb)"
                  type="number"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  fullWidth
                  required
                  variant="outlined"
              />
              <TextField
                  label="Date Tested"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                  variant="outlined"
              />

              <Box>
                <InputLabel sx={{ mb: 1 }}>
                  Upload Lead Test Photo
                </InputLabel>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                />
              </Box>

              <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSubmit}
                  sx={{
                    py: 1.5,
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
              >
                Submit Report
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
  );
};

export default Report;
