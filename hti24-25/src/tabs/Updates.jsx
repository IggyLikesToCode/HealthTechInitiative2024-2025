import React from "react";
import {
    Container,
    Typography,
    Card,
    CardContent,
    Box,
} from "@mui/material";
import {
    ScienceOutlined,
    HandshakeOutlined,
    LocationOnOutlined,
    MenuBookOutlined,
    DescriptionOutlined,
    AccountBalanceOutlined,
} from "@mui/icons-material";

/* =========================
   DATA
========================= */

const updates = [
    {
        title: "Testing School Water Fountains",
        date: "Dec 2025",
        icon: <ScienceOutlined />,
        content: [
            "We tested four public drinking water fountains in Connecticut using commercially available lead test strips.",
            "We are currently reviewing results and will share verified summaries with the community once complete.",
        ],
    },
    {
        title: "Talking with the EPA",
        date: "Nov 2025",
        icon: <HandshakeOutlined />,
        content: [
            "We spoke with EPA staff about responsible data sharing, risk communication, and how community-reported data can support prevention efforts.",
        ],
    },
    {
        title: "Growing the Map",
        date: "Nov 2025",
        icon: <LocationOnOutlined />,
        content: [
            "New community-submitted reports have been added in Connecticut, improving local visibility into potential exposure hotspots.",
        ],
    },
];

const learnMore = [
    {
        title: "How to Read a Lead Test Strip",
        blurb: "A simple guide to understanding your test results.",
        icon: <MenuBookOutlined />,
    },
    {
        title: "What Lead Levels Mean (Plain English)",
        blurb: "What different lead levels mean for families and kids.",
        icon: <DescriptionOutlined />,
    },
    {
        title: "EPA: Lead in Drinking Water",
        blurb: "Federal standards and recommendations.",
        icon: <AccountBalanceOutlined />,
    },
];

/* =========================
   COMPONENT
========================= */

export default function Updates() {
    return (
        <Container
            maxWidth="xl"
            sx={{
                pt: { xs: 3, md: 4 },
                pb: { xs: 6, md: 8 },
            }}
        >
            {/* PAGE HEADER */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h3" fontWeight={700} sx={{ color: "#0f172a" }}>
                    Updates
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    What we’re building, testing, and learning — in the field and in research.
                </Typography>
            </Box>

            {/* TWO COLUMN LAYOUT */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "68% 32%" },
                    gap: "40px",
                    alignItems: "flex-start",
                }}
            >
                {/* LEFT PANEL */}
                <Box
                    sx={{
                        backgroundColor: "#ffffff",
                        borderRadius: "24px",
                        p: 3.5,
                        border: "1px solid #e5e7eb",
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight={600}
                        sx={{ mb: 3, color: "#0f172a" }}
                    >
                        What We’ve Been Doing
                    </Typography>

                    {updates.map((u, idx) => (
                        <Card
                            key={idx}
                            elevation={0}
                            sx={{
                                mb: 3,
                                borderRadius: "18px",
                                border: "1px solid #e5e7eb",
                                background:
                                    "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: "flex", gap: 2, mb: 1.5 }}>
                                    <Box
                                        sx={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: "12px",
                                            backgroundColor: "#dbeafe",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {React.cloneElement(u.icon, {
                                            sx: { color: "#2563eb" },
                                        })}
                                    </Box>

                                    <Box>
                                        <Typography fontWeight={600} sx={{ color: "#0f172a" }}>
                                            {u.title}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: "#64748b" }}>
                                            {u.date}
                                        </Typography>
                                    </Box>
                                </Box>

                                {u.content.map((p, i) => (
                                    <Typography
                                        key={i}
                                        sx={{
                                            color: "#475569",
                                            lineHeight: 1.65,
                                            mb: i !== u.content.length - 1 ? 1 : 0,
                                        }}
                                    >
                                        {p}
                                    </Typography>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                {/* RIGHT COLUMN WITH PROPER GUTTER */}
                <Box
                    sx={{
                        pr: { md: 2 },   // ⬅ creates equal distance from screen edge
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#eff6ff",
                            borderRadius: "24px",
                            p: 3.5,
                            border: "1px solid #dbeafe",
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight={600}
                            sx={{ mb: 1, color: "#0f172a" }}
                        >
                            Learn More
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 3, color: "#475569" }}>
                            Helpful articles, studies, and guides on lead exposure.
                        </Typography>

                        {learnMore.map((r, i) => (
                            <Card
                                key={i}
                                elevation={0}
                                sx={{
                                    mb: 2,
                                    borderRadius: "16px",
                                    border: "1px solid #dbeafe",
                                    backgroundColor: "#ffffff",
                                }}
                            >
                                <CardContent sx={{ display: "flex", gap: 2 }}>
                                    <Box
                                        sx={{
                                            width: 38,
                                            height: 38,
                                            borderRadius: "10px",
                                            backgroundColor: "#dbeafe",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {React.cloneElement(r.icon, {
                                            sx: { color: "#2563eb" },
                                        })}
                                    </Box>

                                    <Box>
                                        <Typography fontWeight={600} sx={{ color: "#0f172a" }}>
                                            {r.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "#475569" }}>
                                            {r.blurb}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
