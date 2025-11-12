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
  alertTitleClasses,

} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import axios from "axios";

const colorChartSrc = '/assets/varify chart.png'

const BASE_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:3001"
        : "https://leadwatchhti.org";

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

            const uploadRes = await axios.post(`${BASE_URL}/api/upload`, formData, {
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
      <Box sx={{ pt: "8vh", px: { xs: 2, sm: 6 }, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Grid container spacing={4} sx={{flexDirection: { xs: "column", sm: "row" }, alignItems: "flex-start"}}>
          {/* Left: Form */}
          <Grid item sx={{ flex: "1 1 60%", minWidth: 300 }}>
            <Paper sx={{ p: 4, maxWidth: "100%", flexGrow: 1 }}>
              <Typography variant="h5" gutterBottom>
                Report Lead Contamination
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
                Reporting lead contamination helps us track and address potential
                health hazards in our community.
              </Typography>

              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Address"
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
                    label="Name and Test Kit Used"
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
        <Grid item sx={{ flex: "1 1 35%", minWidth: 250 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Instructions
            </Typography>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight={600}>Taking a Picture</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        Follow these tips to capture a usable photo of your test strip:
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, m: 0 }}>
                        <Box component="li">
                            <Typography variant="body2">
                                Shoot in bright, even lighting (avoid harsh shadows and glare).
                            </Typography>
                        </Box>
                        <Box component="li">
                            <Typography variant="body2">
                                Place the strip on a plain background and keep the camera parallel to it.
                            </Typography>
                        </Box>
                        <Box component="li">
                            <Typography variant="body2">
                                Include the kit’s color chart in the same frame for reference.
                            </Typography>
                        </Box>
                        <Box component="li">
                            <Typography variant="body2">
                                Fill most of the frame with the strip + chart; ensure everything is in focus.
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mt: 1.5,
                            p: 1,
                            bgcolor: "action.hover",
                            borderRadius: 1.5,
                        }}
                    >
                        <Typography variant="caption">
                            Pro tip: Take two photos—one wider with the chart, one close-up of the strip.
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight={600}>How to Fill the Form</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box component="ol" sx={{ pl: 3, m: 0 }}>
                        <Box component="li" sx={{ mb: 0.5 }}>
                            <Typography variant="body2">
                                <strong>Location</strong>: street address or landmark (e.g., “123 Main St” or “Saugatuck River – south bank”).
                            </Typography>
                        </Box>
                        <Box component="li" sx={{ mb: 0.5 }}>
                            <Typography variant="body2">
                                <strong>Lead Level (ppb)</strong>: enter the number you read from the chart (parts per billion).
                            </Typography>
                        </Box>
                        <Box component="li" sx={{ mb: 0.5 }}>
                            <Typography variant="body2">
                                <strong>Name and Test Kit Used</strong>: kit brand/model (e.g., “TapScore Advanced Lead”).
                            </Typography>
                        </Box>
                        <Box component="li" sx={{ mb: 0.5 }}>
                            <Typography variant="body2">
                                <strong>Date Tested</strong>: the day you ran the test.
                            </Typography>
                        </Box>
                        <Box component="li">
                            <Typography variant="body2">
                                <strong>Upload Photo</strong>: include the strip and the color chart in one photo if possible.
                            </Typography>
                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight={600}>Color Chart</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2" sx={{ mb: 1.5 }}>
                        Match your strip’s color to the closest block in the chart to determine the lead level.
                        Record the corresponding value (in ppb) in the form.
                    </Typography>

                    {/* Color Chart Image */}
                    <Box
                        component="img"
                        src={colorChartSrc}
                        alt="Lead test color reference chart"
                        sx={{
                            width: "100%",
                            height: "auto",
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: 1,
                            mb: 1.5,
                        }}
                    />

                    <Typography variant="caption" color="text.secondary">
                        Example reference chart. Use the chart from your specific kit if it differs.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight={600}>Recommended Test Kits</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2">
                        Use SafeHome, TapScore, or WaterSafe kits for reliable results. Follow the manufacturer’s timing and rinsing instructions exactly.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Grid>
        </Grid>
      </Box>
  );
};

export default Report;
