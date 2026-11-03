import React from "react";
import {
    Box,
    Button,
    Container,
    Link,
    Stack,
    Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const COLORS = {
    navy: "#0B2B4A",
    aqua: "#C5FFF7",
    mission: "#81979D",
    terracotta: "#B87967",
    lightGray: "#E2E2E2",
    white: "#FFFFFF",
    purple: "#2B12D7",
};

const FONT = '"Avenir Next", Avenir, "Helvetica Neue", Arial, sans-serif';

const impactStats = [
    { value: "300+", label: "Community Reports" },
    { value: "$5K+", label: "Funding & Resources" },
    { value: "EPA", label: "PEYA Award Winner" },
];

const partners = [
    {
        name: "SenSafe / Industrial Test Systems",
        image: "/assets/sensafe.png",
        href: "https://sensafe.com/",
        width: { xs: "32%", sm: "23%", md: "18%" },
    },
    {
        name: "Tap Score / SimpleLab",
        image: "/assets/tapscore.png",
        href: "https://mytapscore.com/",
        width: { xs: "32%", sm: "23%", md: "18%" },
    },
    {
        name: "NOAH System",
        image: "/assets/noahsystems.png",
        href: "https://www.noahsystem.co/",
        width: { xs: "34%", sm: "24%", md: "18%" },
    },
    {
        name: "Staples High School",
        image: "/assets/stapleshighschool.png",
        href: "https://shs.westportps.org/",
        width: { xs: "23%", sm: "16%", md: "11%" },
    },
];

const Home = () => {
    return (
        <Box
            sx={{
                bgcolor: COLORS.white,
                color: COLORS.navy,
                fontFamily: FONT,
            }}
        >
            {/* HERO */}
            <Box
                component="section"
                sx={{
                    minHeight: { xs: "auto", md: "500px" },
                    display: "flex",
                    alignItems: "center",
                    py: { xs: "9%", md: "6.5%" },
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
                            gridTemplateColumns: { xs: "1fr", md: "61% 39%" },
                            columnGap: { xs: "6%", md: "7%" },
                            rowGap: "6%",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <Typography
                                component="p"
                                sx={{
                                    mb: "2.5%",
                                    fontFamily: FONT,
                                    fontWeight: 800,
                                    fontSize: { xs: "0.85rem", md: "0.96rem" },
                                    letterSpacing: "0.01em",
                                }}
                            >
                                EPA Award-Winning Student Initiative
                            </Typography>

                            <Typography
                                component="h1"
                                sx={{
                                    maxWidth: "760px",
                                    fontFamily: FONT,
                                    fontSize: {
                                        xs: "2.45rem",
                                        sm: "3.4rem",
                                        md: "4.05rem",
                                        lg: "4.45rem",
                                    },
                                    lineHeight: 1.03,
                                    fontWeight: 500,
                                    letterSpacing: "-0.04em",
                                    mb: "5%",
                                }}
                            >
                                Tracking Lead Contamination.
                                <br />
                                Protecting Communities.
                            </Typography>

                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={1.6}
                                sx={{ width: { xs: "100%", sm: "auto" } }}
                            >
                                <Button
                                    component={RouterLink}
                                    to="/report"
                                    disableElevation
                                    sx={{
                                        minWidth: { xs: "100%", sm: "215px" },
                                        px: "3.5%",
                                        py: "1.2%",
                                        borderRadius: "999px",
                                        bgcolor: COLORS.aqua,
                                        color: COLORS.navy,
                                        fontFamily: FONT,
                                        textTransform: "none",
                                        fontSize: "1rem",
                                        fontWeight: 700,
                                        "&:hover": { bgcolor: "#AFFFF5" },
                                    }}
                                >
                                    Report Contamination
                                </Button>

                                <Button
                                    component={RouterLink}
                                    to="/map"
                                    disableElevation
                                    sx={{
                                        minWidth: { xs: "100%", sm: "155px" },
                                        px: "3.5%",
                                        py: "1.2%",
                                        borderRadius: "999px",
                                        bgcolor: "#D5D7D9",
                                        color: COLORS.navy,
                                        fontFamily: FONT,
                                        textTransform: "none",
                                        fontSize: "1rem",
                                        fontWeight: 700,
                                        "&:hover": { bgcolor: "#C7C9CC" },
                                    }}
                                >
                                    View Data
                                </Button>
                            </Stack>
                        </Box>

                        <Box
                            sx={{
                                maxWidth: "520px",
                                justifySelf: { xs: "start", md: "end" },
                                alignSelf: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    fontSize: { xs: "1.15rem", md: "1.32rem" },
                                    lineHeight: 1.33,
                                    fontWeight: 500,
                                }}
                            >
                                A nationwide, open-source platform that empowers communities to
                                report, explore, and access lead contamination data.
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* IMPACT */}
            <Box
                component="section"
                sx={{
                    bgcolor: COLORS.navy,
                    color: COLORS.aqua,
                    py: { xs: "10%", sm: "7%", md: "5.5%" },
                    backgroundImage:
                        "radial-gradient(circle at 50% 0%, rgba(197,255,247,0.045), transparent 38%)",
                }}
            >


                <Container
                    maxWidth={false}
                    sx={{ width: "100%", maxWidth: "1240px !important" }}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                            gap: { xs: "7%", sm: "2%" },
                            textAlign: "center",
                        }}
                    >
                        {impactStats.map((stat) => (
                            <Box key={stat.value}>
                                <Typography
                                    sx={{
                                        fontFamily: FONT,
                                        fontSize: { xs: "3rem", md: "4rem" },
                                        lineHeight: 1,
                                        fontWeight: 400,
                                        letterSpacing: "-0.035em",
                                    }}
                                >
                                    {stat.value}
                                </Typography>

                                <Typography
                                    sx={{
                                        mt: "3%",
                                        fontFamily: FONT,
                                        fontSize: { xs: "0.92rem", md: "1rem" },
                                        color: "rgba(197,255,247,0.9)",
                                    }}
                                >
                                    {stat.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* PARTNERS */}
            <Box component="section" sx={{ py: { xs: "10%", md: "5%" } }}>
                <Container
                    maxWidth={false}
                    sx={{ width: "100%", maxWidth: "1240px !important" }}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "39% 61%" },
                            columnGap: { xs: "5%", md: "7%" },
                            rowGap: "7%",
                            alignItems: "center",
                            pb: { xs: "8%", md: "4%" },
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    fontSize: { xs: "1.08rem", md: "1.16rem" },
                                    lineHeight: 1.45,
                                    fontWeight: 500,
                                    maxWidth: "500px",
                                }}
                            >
                                Our partners help us turn community interest into real testing,
                                education, and action.
                            </Typography>

                            <Typography
                                sx={{
                                    mt: "4%",
                                    fontFamily: FONT,
                                    fontSize: { xs: "0.95rem", md: "1rem" },
                                    lineHeight: 1.5,
                                    color: "rgba(11,43,74,0.72)",
                                    maxWidth: "520px",
                                }}
                            >
                                Support has included professional lead-testing equipment,
                                laboratory analysis, community resources, and direct support for
                                expanding LeadWatch programs.
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexWrap: "wrap",
                                alignItems: "center",
                                justifyContent: { xs: "flex-start", md: "flex-end" },
                                gap: { xs: "7%", sm: "6%", md: "5%" },
                                rowGap: { xs: "28px", md: "34px" },
                            }}
                        >
                            {partners.map((partner) => (
                                <Box
                                    key={partner.name}
                                    component="a"
                                    href={partner.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={partner.name}
                                    sx={{
                                        width: partner.width,
                                        minWidth: { xs: "90px", sm: "105px" },
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textDecoration: "none",
                                        transition: "transform 180ms ease",
                                        "&:hover": {
                                            transform: "translateY(-3px)",
                                        },
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={partner.image}
                                        alt={partner.name}
                                        sx={{
                                            width: "100%",
                                            height: "auto",
                                            maxHeight: { xs: "70px", md: "90px" },
                                            objectFit: "contain",
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            borderTop: "1px solid rgba(11,43,74,0.09)",
                            pt: { xs: "7%", md: "3%" },
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { xs: "flex-start", sm: "center" },
                            gap: { xs: "18px", sm: "3%" },
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: FONT,
                                fontSize: { xs: "1rem", md: "1.05rem" },
                                fontWeight: 500,
                            }}
                        >
                            Interested in helping us expand testing, education, or community
                            outreach?
                        </Typography>

                        <Button
                            component={RouterLink}
                            to="/contact"
                            disableElevation
                            sx={{
                                px: "4%",
                                py: "1%",
                                borderRadius: "999px",
                                bgcolor: COLORS.aqua,
                                color: COLORS.navy,
                                fontFamily: FONT,
                                textTransform: "none",
                                fontSize: "1rem",
                                fontWeight: 700,
                                whiteSpace: "nowrap",
                                "&:hover": { bgcolor: "#AFFFF5" },
                            }}
                        >
                            Become a Partner
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* MISSION */}
            <Box
                id="mission"
                component="section"
                sx={{
                    bgcolor: COLORS.mission,
                    color: COLORS.navy,
                    py: { xs: "11%", md: "6%" },
                    scrollMarginTop: "90px",
                }}
            >
                <Container
                    maxWidth={false}
                    sx={{ width: "100%", maxWidth: "1240px !important" }}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "30% 70%" },
                            columnGap: { xs: "5%", md: "7%" },
                            rowGap: "5%",
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: FONT,
                                fontWeight: 800,
                                fontSize: { xs: "1.15rem", md: "1.28rem" },
                                letterSpacing: "0.02em",
                                textTransform: "uppercase",
                            }}
                        >
                            Our Mission
                        </Typography>

                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    fontSize: { xs: "1.12rem", md: "1.22rem" },
                                    lineHeight: 1.45,
                                    mb: "4%",
                                }}
                            >
                                Health Tech Initiative was founded at Staples High School in
                                Westport, Connecticut to help young people use technology,
                                research, and hands-on community work to address public-health
                                challenges.
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    fontSize: { xs: "1.12rem", md: "1.22rem" },
                                    lineHeight: 1.45,
                                    mb: "4%",
                                }}
                            >
                                Through LeadWatch, we combine community reporting with
                                professional field screening, laboratory testing, school and
                                public-facility projects, educational programs, and local
                                outreach. More than 300 community reports have now been
                                submitted through the platform, including reports that
                                participants have chosen to keep private.
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    fontSize: { xs: "1.12rem", md: "1.22rem" },
                                    lineHeight: 1.45,
                                }}
                            >
                                Our work has grown beyond the database itself. We have hosted
                                community Water Drives, begun testing initiatives with schools,
                                developed hands-on water education programs, and built
                                partnerships that help communities move from awareness toward
                                informed action.
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            mt: { xs: "11%", md: "8%" },
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "76% 24%" },
                            alignItems: "end",
                            columnGap: { xs: "4%", md: "5%" },
                        }}
                    >
                        <Box
                            aria-hidden="true"
                            sx={{
                                width: "100%",
                                borderTop: `2px solid ${COLORS.navy}`,
                                mb: { xs: "6%", md: "8%" },
                            }}
                        />

                        <Link
                            component={RouterLink}
                            to="/map"
                            underline="none"
                            aria-label="View LeadWatch data"
                            sx={{
                                display: "flex",
                                justifyContent: { xs: "flex-start", md: "center" },
                                alignItems: "flex-end",
                            }}
                        >
                            <Box
                                component="img"
                                src="/assets/Logo_B&W.png"
                                alt="LeadWatch HTI"
                                sx={{
                                    width: { xs: "42%", sm: "30%", md: "72%" },
                                    maxWidth: "190px",
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                            />
                        </Link>
                    </Box>
                </Container>
            </Box>

            {/* CALL TO ACTION */}
            <Box
                component="section"
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                }}
            >
                <Box
                    component="a"
                    href="#mission"
                    sx={{
                        minHeight: { xs: "150px", md: "175px" },
                        px: { xs: "8%", md: "10%" },
                        py: { xs: "10%", md: "6%" },
                        bgcolor: COLORS.lightGray,
                        color: COLORS.navy,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: { xs: "flex-start", md: "center" },
                        justifyContent: "center",
                        textDecoration: "none",
                        transition: "filter 180ms ease",
                        "&:hover": { filter: "brightness(0.97)" },
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: FONT,
                            fontSize: { xs: "1.7rem", md: "2rem" },
                            fontWeight: 500,
                        }}
                    >
                        Get to know our work
                    </Typography>

                    <Typography
                        sx={{
                            mt: "2%",
                            maxWidth: "430px",
                            textAlign: { xs: "left", md: "center" },
                            fontFamily: FONT,
                            fontSize: "0.95rem",
                            lineHeight: 1.45,
                            opacity: 0.8,
                        }}
                    >
                        From community Water Drives to school testing and education,
                        LeadWatch turns data into local action.
                    </Typography>
                </Box>

                <Box
                    component={RouterLink}
                    to="/chapters"
                    sx={{
                        minHeight: { xs: "150px", md: "175px" },
                        px: { xs: "8%", md: "10%" },
                        py: { xs: "10%", md: "6%" },
                        bgcolor: COLORS.terracotta,
                        color: COLORS.navy,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: { xs: "flex-start", md: "center" },
                        justifyContent: "center",
                        textDecoration: "none",
                        transition: "filter 180ms ease",
                        "&:hover": { filter: "brightness(0.96)" },
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: FONT,
                            fontSize: { xs: "1.7rem", md: "2rem" },
                            fontWeight: 500,
                        }}
                    >
                        → Start your chapter
                    </Typography>

                    <Typography
                        sx={{
                            mt: "2%",
                            maxWidth: "470px",
                            textAlign: { xs: "left", md: "center" },
                            fontFamily: FONT,
                            fontSize: "0.95rem",
                            lineHeight: 1.45,
                            opacity: 0.82,
                        }}
                    >
                        Bring LeadWatch testing, education, and community outreach to your
                        school or local community.
                    </Typography>
                </Box>
            </Box>

            {/* FOOTER */}
            <Box
                component="footer"
                sx={{
                    bgcolor: COLORS.navy,
                    color: COLORS.white,
                    py: { xs: "8%", md: "3.5%" },
                }}
            >
                <Container
                    maxWidth={false}
                    sx={{ width: "100%", maxWidth: "1240px !important" }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            justifyContent: "space-between",
                            alignItems: { xs: "flex-start", md: "center" },
                            gap: { xs: "24px", md: "4%" },
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    fontWeight: 700,
                                    mb: "1%",
                                }}
                            >
                                Health Tech Initiative
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    fontSize: "0.82rem",
                                    color: "rgba(255,255,255,0.68)",
                                }}
                            >
                                © {new Date().getFullYear()} Health Tech Initiative. All rights
                                reserved.
                            </Typography>
                        </Box>

                        <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap" }}>
                            <Link
                                href="https://www.linkedin.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                color="inherit"
                                underline="hover"
                                sx={{ fontFamily: FONT }}
                            >
                                LinkedIn
                            </Link>

                            <Link
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                color="inherit"
                                underline="hover"
                                sx={{ fontFamily: FONT }}
                            >
                                Facebook
                            </Link>

                            <Link
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                color="inherit"
                                underline="hover"
                                sx={{ fontFamily: FONT }}
                            >
                                Instagram
                            </Link>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;
