import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    InputLabel,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

const COLORS = {
    navy: "#0B2B4A",
    aqua: "#C5FFF7",
    teal: "#A7C5C9",
    terracotta: "#C69282",
    lightGray: "#F3F3F3",
    white: "#FFFFFF",
};

const FONT = '"Avenir Next", Avenir, "Helvetica Neue", Arial, sans-serif';

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
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        const newErrors = {};

        if (!location) newErrors.location = "Address is required.";
        if (!level) newErrors.level = "Lead level is required.";
        if (!testKit) newErrors.testKit = "Test kit is required.";
        if (!date) newErrors.date = "Date tested is required.";
        if (!file) newErrors.file = "A test photo must be uploaded.";

        setErrors(newErrors);
        setSuccess(false);

        if (Object.keys(newErrors).length > 0) return;

        try {
            setSubmitting(true);

            const locationIqKey = "pk.4e7d542fb27c753e173543c95bf667e6";

            const geoRes = await axios.get(
                `https://us1.locationiq.com/v1/search.php?key=${locationIqKey}&q=${encodeURIComponent(
                    location
                )}&format=json`
            );

            if (!geoRes.data || geoRes.data.length === 0) {
                setErrors({
                    location: "We could not find that address. Please try again.",
                });
                setSubmitting(false);
                return;
            }

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

                const uploadRes = await axios.post(
                    `${BASE_URL}/api/upload`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );

                if (!uploadRes.data.success) {
                    setErrors({
                        file: "Image upload failed — please try again.",
                    });
                    setSubmitting(false);
                    return;
                }

                setLocation("");
                setLevel("");
                setDate("");
                setFile(null);
                setTestKit("");
                setErrors({});
                setSuccess(true);

                const fileInput = document.getElementById("lead-test-photo");
                if (fileInput) fileInput.value = "";
            } else {
                setErrors({
                    submit: "Report submission failed.",
                });
            }
        } catch (err) {
            console.error("Error submitting lead report:", err);
            setErrors({
                submit: "Something went wrong — please try again.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const fieldSx = {
        "& .MuiOutlinedInput-root": {
            borderRadius: "999px",
            bgcolor: COLORS.white,
            fontFamily: FONT,
            "& fieldset": {
                borderColor: COLORS.navy,
            },
            "&:hover fieldset": {
                borderColor: COLORS.navy,
            },
            "&.Mui-focused fieldset": {
                borderColor: COLORS.navy,
                borderWidth: "1.5px",
            },
        },
        "& .MuiInputLabel-root": {
            fontFamily: FONT,
            color: COLORS.navy,
        },
        "& .MuiFormHelperText-root": {
            fontFamily: FONT,
        },
    };

    return (
        <Box
            sx={{
                bgcolor: COLORS.white,
                color: COLORS.navy,
                fontFamily: FONT,
            }}
        >
            {/* MAIN REPORT AREA */}
            <Box
                component="section"
                sx={{
                    pt: {
                        xs: "6%",
                        md: "3.5%",
                    },
                    pb: 0,
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "34% 66%",
                        },
                        minHeight: {
                            xs: "auto",
                            md: "500px",
                        },
                        alignItems: "stretch",
                    }}
                >
                    {/* LEFT MESSAGE PANEL */}
                    <Box
                        sx={{
                            bgcolor: COLORS.terracotta,
                            px: {
                                xs: "8%",
                                md: "14%",
                            },
                            py: {
                                xs: "9%",
                                md: "8%",
                            },
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height: "100%",
                        }}
                    >
                        <Box>
                            <Typography
                                component="h1"
                                sx={{
                                    fontFamily: FONT,
                                    fontSize: {
                                        xs: "2rem",
                                        md: "2.25rem",
                                    },
                                    lineHeight: 1.08,
                                    fontWeight: 500,
                                    letterSpacing: "-0.03em",
                                    maxWidth: "420px",
                                    mb: "6%",
                                }}
                            >
                                Want to help tackle lead contamination?
                                <br />
                                Make the invisible visible.
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    fontSize: {
                                        xs: "0.98rem",
                                        md: "1.05rem",
                                    },
                                    fontWeight: 700,
                                    maxWidth: "380px",
                                    lineHeight: 1.45,
                                }}
                            >
                                Your report can help communities take action.
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                mt: {
                                    xs: "12%",
                                    md: "8%",
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    fontSize: "0.92rem",
                                    lineHeight: 1.5,
                                    color: "rgba(11,43,74,0.78)",
                                }}
                            >
                                Questions about testing or your submission?
                            </Typography>

                            <Typography
                                component="a"
                                href="mailto:leadwatchhti@gmail.com"
                                sx={{
                                    display: "inline-block",
                                    mt: "1%",
                                    fontFamily: FONT,
                                    fontSize: "0.92rem",
                                    fontWeight: 700,
                                    color: COLORS.navy,
                                    textDecoration: "none",
                                    "&:hover": {
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                leadwatchhti@gmail.com
                            </Typography>
                        </Box>
                    </Box>

                    {/* RIGHT FORM PANEL */}
                    <Paper
                        elevation={0}
                        sx={{
                            borderRadius: 0,
                            px: {
                                xs: "7%",
                                md: "8%",
                            },
                            py: {
                                xs: "8%",
                                md: "5.5%",
                            },
                            bgcolor: COLORS.white,
                            border: "1px solid rgba(11,43,74,0.06)",
                            height: "100%",
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: FONT,
                                fontSize: {
                                    xs: "1.5rem",
                                    md: "1.75rem",
                                },
                                fontWeight: 600,
                                letterSpacing: "-0.02em",
                                mb: "1%",
                            }}
                        >
                            Report a result
                        </Typography>

                        <Typography
                            sx={{
                                fontFamily: FONT,
                                fontSize: {
                                    xs: "0.9rem",
                                    md: "0.96rem",
                                },
                                color: "rgba(11,43,74,0.65)",
                                lineHeight: 1.5,
                                mb: "5%",
                            }}
                        >
                            Enter the result exactly as it appears on your test and upload a
                            clear photo for review.
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                            }}
                        >
                            <TextField
                                label="Address"
                                placeholder="Enter the address"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                fullWidth
                                error={!!errors.location}
                                helperText={errors.location}
                                sx={fieldSx}
                            />

                            <TextField
                                label="Test Kit Used"
                                placeholder="e.g. SenSafe, TapScore, WaterSafe"
                                value={testKit}
                                onChange={(e) => setTestKit(e.target.value)}
                                fullWidth
                                error={!!errors.testKit}
                                helperText={errors.testKit}
                                sx={fieldSx}
                            />

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "1fr",
                                        sm: "0.75fr 1fr",
                                    },
                                    gap: "16px",
                                }}
                            >
                                <TextField
                                    label="Lead Level (ppb)"
                                    type="number"
                                    value={level}
                                    onChange={(e) => setLevel(e.target.value)}
                                    fullWidth
                                    error={!!errors.level}
                                    helperText={errors.level}
                                    sx={fieldSx}
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
                                    sx={fieldSx}
                                />
                            </Box>

                            <Box>
                                <InputLabel
                                    sx={{
                                        mb: "1.5%",
                                        fontFamily: FONT,
                                        color: COLORS.navy,
                                        fontWeight: 600,
                                        fontSize: "0.92rem",
                                    }}
                                >
                                    Upload Lead Test Photo
                                </InputLabel>

                                <Button
                                    component="label"
                                    variant="outlined"
                                    sx={{
                                        width: { xs: "100%", sm: "48%" },
                                        minHeight: "52px",
                                        borderRadius: "999px",
                                        borderColor: COLORS.navy,
                                        color: COLORS.navy,
                                        fontFamily: FONT,
                                        textTransform: "none",
                                        fontWeight: 600,
                                        "&:hover": {
                                            borderColor: COLORS.navy,
                                            bgcolor: "rgba(197,255,247,0.25)",
                                        },
                                    }}
                                >
                                    {file ? file.name : "Upload Photo"}
                                    <input
                                        id="lead-test-photo"
                                        hidden
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                </Button>

                                {errors.file && (
                                    <Typography
                                        sx={{
                                            mt: "1%",
                                            fontFamily: FONT,
                                            fontSize: "0.78rem",
                                            color: "#C62828",
                                        }}
                                    >
                                        {errors.file}
                                    </Typography>
                                )}
                            </Box>

                            {errors.submit && (
                                <Typography
                                    sx={{
                                        fontFamily: FONT,
                                        fontSize: "0.9rem",
                                        color: "#C62828",
                                    }}
                                >
                                    {errors.submit}
                                </Typography>
                            )}

                            {success && (
                                <Box
                                    sx={{
                                        bgcolor: "rgba(197,255,247,0.55)",
                                        borderRadius: "14px",
                                        p: "3%",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: FONT,
                                            fontWeight: 700,
                                            fontSize: "0.95rem",
                                        }}
                                    >
                                        Report submitted successfully.
                                    </Typography>

                                    <Typography
                                        sx={{
                                            mt: "1%",
                                            fontFamily: FONT,
                                            fontSize: "0.86rem",
                                            color: "rgba(11,43,74,0.7)",
                                        }}
                                    >
                                        Thank you for contributing to LeadWatch.
                                    </Typography>
                                </Box>
                            )}

                            <Box>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    sx={{
                                        px: "5%",
                                        py: "1.4%",
                                        borderRadius: "999px",
                                        bgcolor: COLORS.aqua,
                                        color: COLORS.navy,
                                        fontFamily: FONT,
                                        textTransform: "none",
                                        fontSize: "0.98rem",
                                        fontWeight: 700,
                                        "&:hover": {
                                            bgcolor: "#AFFFF5",
                                        },
                                        "&.Mui-disabled": {
                                            bgcolor: "rgba(197,255,247,0.5)",
                                            color: "rgba(11,43,74,0.5)",
                                        },
                                    }}
                                >
                                    {submitting ? "Submitting..." : "→ Submit Report"}
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Box>

            {/* INFORMATION BAND */}
            <Box
                component="section"
                sx={{
                    bgcolor: COLORS.navy,
                    color: COLORS.white,
                    py: {
                        xs: "7%",
                        md: "3.25%",
                    },
                }}
            >
                <Container
                    maxWidth={false}
                    sx={{
                        width: "100%",
                        maxWidth: "1240px !important",
                    }}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "1fr 1fr",
                            },
                            gap: {
                                xs: "8%",
                                md: "10%",
                            },
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    fontSize: {
                                        xs: "0.82rem",
                                        md: "0.88rem",
                                    },
                                    fontWeight: 800,
                                    letterSpacing: "0.04em",
                                    color: COLORS.aqua,
                                    mb: "2%",
                                }}
                            >
                                PRIVACY & REVIEW
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    fontSize: {
                                        xs: "0.96rem",
                                        md: "1rem",
                                    },
                                    lineHeight: 1.55,
                                    color: "rgba(255,255,255,0.9)",
                                }}
                            >
                                Submitting a report does not automatically place it on the
                                public map. LeadWatch reviews community submissions before any
                                result is considered for publication, and some reports remain
                                private.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    fontSize: {
                                        xs: "0.82rem",
                                        md: "0.88rem",
                                    },
                                    fontWeight: 800,
                                    letterSpacing: "0.04em",
                                    color: COLORS.aqua,
                                    mb: "2%",
                                }}
                            >
                                FOR A CLEAR SUBMISSION
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    fontSize: {
                                        xs: "0.96rem",
                                        md: "1rem",
                                    },
                                    lineHeight: 1.55,
                                    color: "rgba(255,255,255,0.9)",
                                }}
                            >
                                Use bright, even lighting, avoid glare, and include the test
                                strip with the kit’s reference chart when possible. Always
                                follow the instructions provided with your specific test kit.
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* BOTTOM CTA */}
            <Box
                component="section"
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "1fr 1fr",
                    },
                }}
            >
                <Box
                    component={RouterLink}
                    to="/"
                    sx={{
                        minHeight: {
                            xs: "130px",
                            md: "145px",
                        },
                        bgcolor: COLORS.teal,
                        color: COLORS.navy,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        px: "8%",
                        textDecoration: "none",
                        transition: "filter 180ms ease",
                        "&:hover": {
                            filter: "brightness(0.97)",
                        },
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: FONT,
                            fontSize: {
                                xs: "1.55rem",
                                md: "1.9rem",
                            },
                            fontWeight: 500,
                        }}
                    >
                        Get to know us!
                    </Typography>
                </Box>

                <Box
                    component={RouterLink}
                    to="/map"
                    sx={{
                        minHeight: {
                            xs: "130px",
                            md: "145px",
                        },
                        bgcolor: COLORS.lightGray,
                        color: COLORS.navy,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        px: "8%",
                        textDecoration: "none",
                        transition: "filter 180ms ease",
                        "&:hover": {
                            filter: "brightness(0.96)",
                        },
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: FONT,
                            fontSize: {
                                xs: "1.55rem",
                                md: "1.9rem",
                            },
                            fontWeight: 500,
                        }}
                    >
                        → Check data
                    </Typography>
                </Box>
            </Box>

            {/* FOOTER */}
            <Box
                component="footer"
                sx={{
                    bgcolor: COLORS.white,
                    color: COLORS.navy,
                    py: {
                        xs: "8%",
                        md: "4%",
                    },
                }}
            >
                <Container
                    maxWidth={false}
                    sx={{
                        width: "100%",
                        maxWidth: "1240px !important",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: {
                                xs: "column",
                                md: "row",
                            },
                            justifyContent: "space-between",
                            alignItems: {
                                xs: "flex-start",
                                md: "center",
                            },
                            gap: {
                                xs: "24px",
                                md: "4%",
                            },
                        }}
                    >
                        <Box
                            component="img"
                            src="/assets/Logo_B&W.png"
                            alt="LeadWatch HTI"
                            sx={{
                                width: {
                                    xs: "120px",
                                    md: "145px",
                                },
                                height: "auto",
                                objectFit: "contain",
                            }}
                        />

                        <Typography
                            sx={{
                                fontFamily: FONT,
                                fontSize: "0.86rem",
                                color: COLORS.navy,
                            }}
                        >
                            © {new Date().getFullYear()} Health Tech Initiative. All rights
                            reserved.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Report;
