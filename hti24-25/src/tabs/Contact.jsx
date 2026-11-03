import React from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    Typography,
} from "@mui/material";
import { MailOutlined, LinkedinOutlined } from "@ant-design/icons";

const COLORS = {
    navy: "#0B2B4A",
    aqua: "#C5FFF7",
    mist: "#A7C5C9",
    white: "#FFFFFF",
};

const FONT = '"Avenir Next", Avenir, "Helvetica Neue", Arial, sans-serif';

const people = [
    {
        name: "Sahil Vora",
        role: "Co-Founder",
        image: "/assets/sahil.png",
        initials: "SV",
        email: "sv1005093@students.westportps.org",
        linkedin: "https://www.linkedin.com/in/sahil-vora-451a96357/",
    },
    {
        name: "Ignacy Nieweglowski",
        role: "Co-Founder",
        image: "/assets/iggy.png",
        initials: "IN",
        email: "in1012545@students.westportps.org",
        linkedin: "https://www.linkedin.com/in/ignacy-nieweglowski-707859290/",
    },
];

export default function Contact() {
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
                    pt: { xs: "8%", md: "4.5%" },
                    pb: { xs: "7%", md: "4%" },
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "100%",
                            md: "52% 42%",
                        },
                        columnGap: "6%",
                        rowGap: "7%",
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
                            CONTACT
                        </Typography>

                        <Typography
                            component="h1"
                            sx={{
                                fontFamily: FONT,
                                fontWeight: 500,
                                fontSize: {
                                    xs: "2.5rem",
                                    sm: "3rem",
                                    md: "3.7rem",
                                },
                                lineHeight: 1.04,
                                letterSpacing: "-0.035em",
                                maxWidth: "12ch",
                            }}
                        >
                            Let’s build something meaningful.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontFamily: FONT,
                                fontSize: { xs: "1rem", md: "1.14rem" },
                                lineHeight: 1.55,
                                fontWeight: 500,
                                mb: "4%",
                            }}
                        >
                            We’d love to hear from researchers, educators, schools, community
                            partners, students, and anyone interested in supporting or
                            learning more about Health Tech Initiative.
                        </Typography>

                        <Typography
                            sx={{
                                fontFamily: FONT,
                                fontSize: { xs: "0.92rem", md: "0.98rem" },
                                lineHeight: 1.6,
                                color: "rgba(11,43,74,0.68)",
                            }}
                        >
                            For general questions, partnerships, chapter support, or website
                            issues, reach out directly and we’ll get back to you.
                        </Typography>
                    </Box>
                </Box>
            </Container>

            {/* TEAM CONTACTS */}
            <Box
                component="section"
                sx={{
                    bgcolor: COLORS.mist,
                    py: { xs: "10%", md: "6%" },
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
                            fontWeight: 800,
                            fontSize: { xs: "1.35rem", md: "1.6rem" },
                            mb: "5%",
                        }}
                    >
                        GET IN TOUCH
                    </Typography>

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
                        {people.map((person, index) => (
                            <Box
                                key={person.name}
                                sx={{
                                    bgcolor: index === 0 ? COLORS.white : "rgba(255,255,255,0.72)",
                                    borderRadius: "26px",
                                    p: { xs: "7%", md: "6%" },
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "100%",
                                        sm: "28% 68%",
                                    },
                                    gap: "4%",
                                    alignItems: "center",
                                    border: "1px solid rgba(11,43,74,0.08)",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: {
                                            xs: "flex-start",
                                            sm: "center",
                                        },
                                    }}
                                >
                                    <Avatar
                                        src={person.image}
                                        alt={person.name}
                                        sx={{
                                            width: { xs: 96, md: 110 },
                                            height: { xs: 96, md: 110 },
                                            bgcolor: COLORS.navy,
                                            color: COLORS.white,
                                            fontFamily: FONT,
                                            fontWeight: 700,
                                        }}
                                    >
                                        {person.initials}
                                    </Avatar>
                                </Box>

                                <Box>
                                    <Typography
                                        sx={{
                                            fontFamily: FONT,
                                            fontWeight: 700,
                                            fontSize: { xs: "1.45rem", md: "1.7rem" },
                                            mb: "1%",
                                        }}
                                    >
                                        {person.name}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontFamily: FONT,
                                            fontSize: "0.95rem",
                                            color: "rgba(11,43,74,0.62)",
                                            mb: "6%",
                                        }}
                                    >
                                        {person.role}
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: "10px",
                                        }}
                                    >
                                        <Button
                                            href={`mailto:${person.email}`}
                                            startIcon={<MailOutlined />}
                                            sx={{
                                                bgcolor: COLORS.aqua,
                                                color: COLORS.navy,
                                                borderRadius: "999px",
                                                px: "5%",
                                                py: "2%",
                                                fontFamily: FONT,
                                                fontWeight: 700,
                                                textTransform: "none",
                                                "&:hover": {
                                                    bgcolor: "#B5F7EE",
                                                },
                                            }}
                                        >
                                            Email
                                        </Button>

                                        <Button
                                            href={person.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            startIcon={<LinkedinOutlined />}
                                            sx={{
                                                border: `1.5px solid ${COLORS.navy}`,
                                                color: COLORS.navy,
                                                borderRadius: "999px",
                                                px: "5%",
                                                py: "2%",
                                                fontFamily: FONT,
                                                fontWeight: 700,
                                                textTransform: "none",
                                                "&:hover": {
                                                    bgcolor: "rgba(197,255,247,0.28)",
                                                    borderColor: COLORS.navy,
                                                },
                                            }}
                                        >
                                            LinkedIn
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* GENERAL CONTACT */}
            <Box
                component="section"
                sx={{
                    bgcolor: COLORS.navy,
                    color: COLORS.white,
                    py: { xs: "9%", md: "5%" },
                }}
            >
                <Container
                    maxWidth={false}
                    sx={{
                        width: "90%",
                        mx: "auto",
                        px: "0%",
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "100%",
                            md: "62% 32%",
                        },
                        columnGap: "6%",
                        rowGap: "6%",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: FONT,
                                color: COLORS.aqua,
                                fontWeight: 800,
                                fontSize: { xs: "0.92rem", md: "1rem" },
                                mb: "2%",
                            }}
                        >
                            GENERAL INQUIRIES
                        </Typography>

                        <Typography
                            sx={{
                                fontFamily: FONT,
                                fontWeight: 500,
                                fontSize: { xs: "1.8rem", md: "2.35rem" },
                                lineHeight: 1.2,
                                maxWidth: "18ch",
                            }}
                        >
                            Prefer one inbox for everything?
                        </Typography>
                    </Box>

                    <Button
                        href="mailto:leadwatchhti@gmail.com"
                        sx={{
                            justifySelf: { xs: "start", md: "end" },
                            bgcolor: COLORS.aqua,
                            color: COLORS.navy,
                            borderRadius: "999px",
                            px: "7%",
                            py: "3%",
                            fontFamily: FONT,
                            fontWeight: 700,
                            fontSize: "1rem",
                            textTransform: "none",
                            "&:hover": {
                                bgcolor: "#B5F7EE",
                            },
                        }}
                    >
                        → leadwatchhti@gmail.com
                    </Button>
                </Container>
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
}
