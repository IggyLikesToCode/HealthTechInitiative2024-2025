import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const COLORS = {
    navy: "#0B2B4A",
    aqua: "#C5FFF7",
    mist: "#A7C5C9",
    lavender: "#99A8D6",
    terracotta: "#C99687",
    white: "#FFFFFF",
    softGray: "#F6F6F4",
};

const FONT = '"Avenir Next", Avenir, "Helvetica Neue", Arial, sans-serif';

const BASE_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:3001"
        : "https://leadwatchhti.org";

const gradeOptions = ["9th", "10th", "11th", "12th"];

const CreateChapter = () => {
    const [grade, setGrade] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        setSuccess(false);
        setErrorMessage("");

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        data.grade = grade;

        if (!grade) {
            setErrorMessage("Please select your grade level.");
            return;
        }

        try {
            setSubmitting(true);

            const response = await fetch(`${BASE_URL}/api/send-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Application submission failed");
            }

            form.reset();
            setGrade("");
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setErrorMessage(
                "Something went wrong while sending your application. Please try again."
            );
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
    };

    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: COLORS.white,
                color: COLORS.navy,
                fontFamily: FONT,
            }}
        >
            {/* HERO */}
            <Container
                maxWidth={false}
                sx={{
                    width: "90%",
                    mx: "auto",
                    px: "0%",
                    pt: { xs: "7%", md: "4%" },
                    pb: { xs: "7%", md: "4%" },
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "100%",
                            md: "54% 40%",
                        },
                        columnGap: "6%",
                        rowGap: "8%",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: FONT,
                                fontWeight: 800,
                                fontSize: { xs: "0.92rem", md: "1rem" },
                                mb: "2%",
                            }}
                        >
                            START A CHAPTER
                        </Typography>

                        <Typography
                            component="h1"
                            sx={{
                                fontFamily: FONT,
                                fontWeight: 500,
                                fontSize: {
                                    xs: "2.35rem",
                                    sm: "2.9rem",
                                    md: "3.35rem",
                                },
                                lineHeight: 1.05,
                                letterSpacing: "-0.035em",
                                maxWidth: "15ch",
                                mb: "5%",
                            }}
                        >
                            Bring LeadWatch to your community.
                        </Typography>

                        <Button
                            href="#chapter-application"
                            sx={{
                                bgcolor: COLORS.aqua,
                                color: COLORS.navy,
                                borderRadius: "999px",
                                px: "6%",
                                py: "2.2%",
                                fontFamily: FONT,
                                fontWeight: 700,
                                fontSize: "0.96rem",
                                textTransform: "none",
                                "&:hover": {
                                    bgcolor: "#B5F7EE",
                                },
                            }}
                        >
                            → Apply to start a chapter
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            alignSelf: "center",
                            maxWidth: "560px",
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: FONT,
                                fontSize: { xs: "1rem", md: "1.12rem" },
                                lineHeight: 1.55,
                                fontWeight: 500,
                                mb: "4%",
                            }}
                        >
                            Build a local team around water testing, education, and community
                            action—with resources and support from Health Tech Initiative.
                        </Typography>

                        <Typography
                            sx={{
                                fontFamily: FONT,
                                fontSize: { xs: "0.92rem", md: "0.98rem" },
                                lineHeight: 1.6,
                                color: "rgba(11,43,74,0.68)",
                            }}
                        >
                            Chapters can begin with awareness and education, then grow into
                            testing projects, Water Drives, school outreach, and other work
                            that fits their local community.
                        </Typography>
                    </Box>
                </Box>
            </Container>

            {/* WHAT YOU'LL DO */}
            <Box
                component="section"
                sx={{
                    bgcolor: COLORS.lavender,
                    py: { xs: "9%", md: "5%" },
                }}
            >
                <Container
                    maxWidth={false}
                    sx={{
                        width: "90%",
                        mx: "auto",
                        px: "0%",
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: FONT,
                            color: COLORS.navy,
                            fontWeight: 800,
                            fontSize: { xs: "1.45rem", md: "1.75rem" },
                            mb: "4%",
                        }}
                    >
                        WHAT YOU’LL DO
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "100%",
                                md: "48% 48%",
                            },
                            columnGap: "4%",
                            rowGap: { xs: "28px", md: "36px" },
                        }}
                    >
                        {[
                            {
                                title: "→ Lead a chapter",
                                text:
                                    "Build a team at your school or in your community and choose projects that matter locally.",
                            },
                            {
                                title: "→ Take action",
                                text:
                                    "Run water-testing projects, awareness campaigns, Water Drives, or educational programs.",
                            },
                            {
                                title: "→ Build a team",
                                text:
                                    "Bring together students who care about public health, environmental safety, technology, and community service.",
                            },
                            {
                                title: "→ Join the network",
                                text:
                                    "Access guidance, resources, testing support, and ideas from Health Tech Initiative as your chapter grows.",
                            },
                        ].map((item) => (
                            <Box key={item.title}>
                                <Typography
                                    sx={{
                                        fontFamily: FONT,
                                        color: COLORS.navy,
                                        fontWeight: 800,
                                        fontSize: { xs: "1rem", md: "1.08rem" },
                                        mb: "1.5%",
                                    }}
                                >
                                    {item.title}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontFamily: FONT,
                                        color: COLORS.navy,
                                        fontSize: { xs: "0.92rem", md: "0.98rem" },
                                        lineHeight: 1.55,
                                        maxWidth: "46ch",
                                    }}
                                >
                                    {item.text}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* APPLICATION */}
            <Box
                id="chapter-application"
                component="section"
                sx={{
                    py: { xs: "10%", md: "6%" },
                }}
            >
                <Container
                    maxWidth={false}
                    sx={{
                        width: "86%",
                        maxWidth: "1050px !important",
                        mx: "auto",
                        px: "0%",
                    }}
                >
                    <Typography
                        component="h2"
                        sx={{
                            fontFamily: FONT,
                            fontWeight: 500,
                            fontSize: { xs: "2rem", md: "2.5rem" },
                            letterSpacing: "-0.025em",
                            mb: "2%",
                        }}
                    >
                        Chapter Application Form
                    </Typography>

                    <Typography
                        sx={{
                            fontFamily: FONT,
                            color: "rgba(11,43,74,0.66)",
                            fontSize: { xs: "0.94rem", md: "1rem" },
                            lineHeight: 1.55,
                            mb: "6%",
                            maxWidth: "66ch",
                        }}
                    >
                        Tell us a little about yourself and where you want to start a
                        chapter. We’ll follow up by email with next steps.
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "22px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "100%",
                                    md: "48% 48%",
                                },
                                gap: "4%",
                            }}
                        >
                            <TextField
                                label="Full Name"
                                type="text"
                                name="name"
                                required
                                fullWidth
                                sx={fieldSx}
                            />

                            <TextField
                                label="Email Address"
                                type="email"
                                name="email"
                                required
                                fullWidth
                                sx={fieldSx}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "100%",
                                    md: "48% 48%",
                                },
                                gap: "4%",
                            }}
                        >
                            <TextField
                                label="School / Organization Name"
                                type="text"
                                name="school"
                                required
                                fullWidth
                                sx={fieldSx}
                            />

                            <TextField
                                label="Location (City, State)"
                                type="text"
                                name="location"
                                required
                                fullWidth
                                sx={fieldSx}
                            />
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    fontWeight: 600,
                                    fontSize: "0.95rem",
                                    mb: "2%",
                                }}
                            >
                                Grade level
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "10px",
                                }}
                            >
                                {gradeOptions.map((option) => {
                                    const selected = grade === option;

                                    return (
                                        <Button
                                            key={option}
                                            type="button"
                                            onClick={() => setGrade(option)}
                                            sx={{
                                                minWidth: "92px",
                                                borderRadius: "999px",
                                                px: "18px",
                                                py: "8px",
                                                border: `1.5px solid ${COLORS.navy}`,
                                                bgcolor: selected ? COLORS.navy : COLORS.white,
                                                color: selected ? COLORS.white : COLORS.navy,
                                                fontFamily: FONT,
                                                fontWeight: 600,
                                                textTransform: "none",
                                                "&:hover": {
                                                    bgcolor: selected
                                                        ? COLORS.navy
                                                        : "rgba(197,255,247,0.35)",
                                                },
                                            }}
                                        >
                                            {option}
                                        </Button>
                                    );
                                })}
                            </Box>
                        </Box>

                        <TextField
                            label="Why do you want to start a chapter?"
                            name="reason"
                            required
                            fullWidth
                            multiline
                            minRows={4}
                            sx={{
                                ...fieldSx,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "18px",
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
                            }}
                        />

                        {errorMessage && (
                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    color: "#B3261E",
                                    fontSize: "0.9rem",
                                }}
                            >
                                {errorMessage}
                            </Typography>
                        )}

                        {success && (
                            <Box
                                sx={{
                                    bgcolor: "rgba(197,255,247,0.55)",
                                    borderRadius: "16px",
                                    px: "4%",
                                    py: "3%",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: FONT,
                                        color: COLORS.navy,
                                        fontWeight: 700,
                                        fontSize: "0.96rem",
                                    }}
                                >
                                    Application submitted successfully.
                                </Typography>

                                <Typography
                                    sx={{
                                        mt: "1%",
                                        fontFamily: FONT,
                                        color: "rgba(11,43,74,0.72)",
                                        fontSize: "0.88rem",
                                    }}
                                >
                                    We’ll follow up with you by email.
                                </Typography>
                            </Box>
                        )}

                        <Box>
                            <Button
                                type="submit"
                                disabled={submitting}
                                sx={{
                                    bgcolor: COLORS.aqua,
                                    color: COLORS.navy,
                                    borderRadius: "999px",
                                    px: "5%",
                                    py: "1.6%",
                                    fontFamily: FONT,
                                    fontWeight: 700,
                                    fontSize: "0.96rem",
                                    textTransform: "none",
                                    "&:hover": {
                                        bgcolor: "#B5F7EE",
                                    },
                                    "&.Mui-disabled": {
                                        bgcolor: "rgba(197,255,247,0.55)",
                                        color: "rgba(11,43,74,0.5)",
                                    },
                                }}
                            >
                                {submitting ? "Submitting..." : "→ Submit application"}
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                mt: "2%",
                                pt: "3%",
                                borderTop: "1px solid rgba(11,43,74,0.10)",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    color: "rgba(11,43,74,0.7)",
                                    fontSize: "0.86rem",
                                }}
                            >
                                Have questions before applying? Contact us directly at{" "}
                                <Box
                                    component="a"
                                    href="mailto:leadwatchhti@gmail.com"
                                    sx={{
                                        color: COLORS.navy,
                                        fontWeight: 700,
                                        textDecoration: "none",
                                        "&:hover": {
                                            textDecoration: "underline",
                                        },
                                    }}
                                >
                                    leadwatchhti@gmail.com
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* CTA BLOCKS */}
            <Box
                sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "100%",
                        md: "50% 50%",
                    },
                }}
            >
                <Box
                    component={RouterLink}
                    to="/"
                    sx={{
                        minHeight: "160px",
                        bgcolor: COLORS.mist,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        px: "8%",
                        textDecoration: "none",
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: FONT,
                            color: COLORS.navy,
                            fontWeight: 500,
                            fontSize: { xs: "1.7rem", md: "2rem" },
                        }}
                    >
                        Get to know our work
                    </Typography>
                </Box>

                <Box
                    component={RouterLink}
                    to="/resources"
                    sx={{
                        minHeight: "160px",
                        bgcolor: COLORS.terracotta,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        px: "8%",
                        textDecoration: "none",
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: FONT,
                            color: COLORS.navy,
                            fontWeight: 500,
                            fontSize: { xs: "1.7rem", md: "2rem" },
                        }}
                    >
                        → Explore resources
                    </Typography>
                </Box>
            </Box>

            {/* FOOTER */}
            <Box
                component="footer"
                sx={{
                    bgcolor: COLORS.white,
                    py: { xs: "8%", md: "4%" },
                }}
            >
                <Container
                    maxWidth={false}
                    sx={{
                        width: "90%",
                        mx: "auto",
                        px: "0%",
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", md: "center" },
                        gap: "24px",
                    }}
                >
                    <Box
                        component="img"
                        src="/assets/Logo_B&W.png"
                        alt="LeadWatch HTI"
                        sx={{
                            width: { xs: "110px", md: "135px" },
                            height: "auto",
                            objectFit: "contain",
                        }}
                    />

                    <Typography
                        sx={{
                            fontFamily: FONT,
                            color: COLORS.navy,
                            fontSize: "0.84rem",
                        }}
                    >
                        © {new Date().getFullYear()} Health Tech Initiative. All rights
                        reserved.
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default CreateChapter;
