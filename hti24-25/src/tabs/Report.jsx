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

const colorChartSrc = "/assets/varify chart.png";

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

    const [errors, setErrors] = useState({});

    const handleSubmit = async () => {
        const newErrors = {};

        if (!location) newErrors.location = "Address is required.";
        if (!level) newErrors.level = "Lead level is required.";
        if (!testKit) newErrors.testKit = "Test kit required. Name is optional.";
        if (!date) newErrors.date = "Date tested is required.";
        if (!file) newErrors.file = "A test photo must be uploaded.";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

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
                test_kit_used: testKit,
            };

            const res = await axios.post(`${BASE_URL}/api/report-lead`, payload);

            if (res.data.success) {
                const reportId = res.data.reportId;

                const formData = new FormData();
                formData.append("image", file);
                formData.append("reportId", reportId);

                const uploadRes = await axios.post(`${BASE_URL}/api/upload`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                if (!uploadRes.data.success) {
                    setErrors({ file: "Image upload failed — try again." });
                    return;
                }

                // Clear everything
                setLocation("");
                setLevel("");
                setDate("");
                setFile(null);
                setTestKit("");
                setErrors({});

                alert("Report submitted successfully!");
            } else {
                setErrors({ submit: "Report submission failed." });
            }
        } catch (err) {
            console.error("Error submitting lead report:", err);
            setErrors({ submit: "Something went wrong — try again." });
        }
    };

    return (
        <Box
            sx={{
                pt: "8vh",
                px: { xs: 2, sm: 6 },
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <Grid
                container
                spacing={4}
                sx={{
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "flex-start",
                }}
            >
                {/* LEFT SIDE FORM */}
                <Grid item sx={{ flex: "1 1 60%", minWidth: 300 }}>
                    <Paper sx={{ p: 4, maxWidth: "100%", flexGrow: 1 }}>
                        <Typography variant="h5" gutterBottom>
                            Report Lead Contamination
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ mb: 3, color: "text.secondary" }}
                        >
                            Reporting lead contamination helps us track and address potential
                            health hazards in our community.
                        </Typography>

                        <Box display="flex" flexDirection="column" gap={2}>
                            <TextField
                                label="Address"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                fullWidth
                                error={!!errors.location}
                                helperText={errors.location}
                            />

                            <TextField
                                label="Lead Level (ppb)"
                                type="number"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                fullWidth
                                error={!!errors.level}
                                helperText={errors.level}
                            />

                            <TextField
                                label="Name and Test Kit Used"
                                value={testKit}
                                onChange={(e) => setTestKit(e.target.value)}
                                fullWidth
                                error={!!errors.testKit}
                                helperText={errors.testKit}
                            />

                            <TextField
                                label="Date Tested"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                error={!!errors.date}
                                helperText={errors.date}
                            />

                            <Box>
                                <InputLabel sx={{ mb: 1 }}>Upload Lead Test Photo*</InputLabel>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                {errors.file && (
                                    <Typography color="error" variant="caption">
                                        {errors.file}
                                    </Typography>
                                )}
                            </Box>

                            {errors.submit && (
                                <Typography color="error" variant="body2">
                                    {errors.submit}
                                </Typography>
                            )}

                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                fullWidth

                                sx={{ py: 1, fontWeight: 600, color: "white" }}
                            >
                                Submit Report
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                {/* RIGHT SIDE INSTRUCTIONS */}
                <Grid item sx={{ flex: "1 1 35%", minWidth: 250 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Instructions
                    </Typography>

                    {/* ACCORDION 1 */}
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
                                        Shoot in bright, even lighting (avoid harsh shadows and
                                        glare).
                                    </Typography>
                                </Box>
                                <Box component="li">
                                    <Typography variant="body2">
                                        Place the strip on a plain background and keep the camera
                                        parallel to it.
                                    </Typography>
                                </Box>
                                <Box component="li">
                                    <Typography variant="body2">
                                        Include the kit’s color chart in the same frame.
                                    </Typography>
                                </Box>
                                <Box component="li">
                                    <Typography variant="body2">
                                        Fill most of the frame with the strip + chart.
                                    </Typography>
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* ACCORDION 2 */}
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight={600}>How to Fill the Form</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box component="ol" sx={{ pl: 3, m: 0 }}>
                                <Box component="li">
                                    <Typography variant="body2">
                                        <strong>Location</strong>: Enter the street address or
                                        identifiable landmark.
                                    </Typography>
                                </Box>
                                <Box component="li">
                                    <Typography variant="body2">
                                        <strong>Lead Level</strong>: Enter the ppb shown on your
                                        test chart.
                                    </Typography>
                                </Box>
                                <Box component="li">
                                    <Typography variant="body2">
                                        <strong>Test Kit</strong>: Provide the brand/model.
                                    </Typography>
                                </Box>
                                <Box component="li">
                                    <Typography variant="body2">
                                        <strong>Date Tested</strong>: Choose the testing date.
                                    </Typography>
                                </Box>
                                <Box component="li">
                                    <Typography variant="body2">
                                        <strong>Upload Photo</strong>: Include both strip + chart in
                                        the image.
                                    </Typography>
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* ACCORDION 3 */}
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight={600}>Color Chart</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body2" sx={{ mb: 1.5 }}>
                                Match your strip color to the closest block to determine ppb.
                            </Typography>

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
                                Example chart — follow the one included with your kit.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    {/* ACCORDION 4 */}
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight={600}>Recommended Test Kits</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body2">
                                SafeHome, TapScore, and WaterSafe provide reliable results.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Report;
