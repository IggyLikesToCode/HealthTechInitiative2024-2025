import {
  Box,
  Typography,
  TextField,
  Button,
  InputLabel,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import axios from "axios";

const BASE_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:3001"
        : "http://18.222.54.133:3001";

const Report = () => {
  const [testKit, setTestKit] = useState("");
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
        test_kit_used: testKit,
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
        setTestKit("");
      } else {
        alert("Report submission failed.");
      }
    } catch (err) {
      console.error("Error submitting lead report:", err);
      alert("Error submitting lead report.");
    }
  };

  return (
      <Box sx={{ pt: "8vh", px: { xs: 2, sm: 6 }, minHeight: "100vh" }}>
        <Grid container spacing={6} alignItems="flex-start">
          {/* Left: Form */}
          <Grid item xs={12} md={7} lg={6}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Report Lead Contamination
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
                Reporting lead contamination helps us track and address potential
                health hazards in our community.
              </Typography>

              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Lead Level (ppb)"
                    type="number"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Test Kit Used"
                    value={testKit}
                    onChange={(e) => setTestKit(e.target.value)}
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
                <Box>
                  <InputLabel sx={{ mb: 1 }}>Upload Lead Test Photo*</InputLabel>
                  <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files[0])}
                  />
                </Box>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    fullWidth
                    sx={{ py: 1, fontWeight: 600 }}
                >
                  Submit Report
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Right: Instructions */}
          <Grid item xs={12} md={5} lg={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Instructions
            </Typography>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>Taking a Picture</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Ensure the test strip is well-lit and in focus. Include the color
                  chart in the picture for reference.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>Recommended Test Kits</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Use SafeHome, TapScore, or WaterSafe kits for better results.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>Color Chart</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Refer to your kit’s color chart to determine lead level.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Box>
  );
};

export default Report;
