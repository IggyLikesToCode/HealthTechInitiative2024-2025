import React, { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat/dist/leaflet-heat.js";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Map() {
    const FONT =
        '"Avenir Next", "Nunito Sans", "Montserrat", "Segoe UI", sans-serif';

    const COLORS = {
        white: "#F7F7F5",
        navy: "#0B2B4A",
        aqua: "#C5FFF7",
        terracotta: "#C99687",
        mist: "#AFCBCD",
        textSoft: "#5D6C80",
        border: "rgba(11, 43, 74, 0.18)",
    };

    const BASE_URL =
        window.location.hostname === "localhost"
            ? "http://localhost:3001"
            : "https://leadwatchhti.org";

    const [viewMode, setViewMode] = useState("heatmap");
    const [layerType, setLayerType] = useState("open");
    const [historicalData, setHistoricalData] = useState([]);
    const [openSourceData, setOpenSourceData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const mapRef = useRef(null);
    const mapElementRef = useRef(null);
    const activeLayersRef = useRef([]);

    const normalizeLeadIntensity = (level) => {
        const value = Number(level);

        if (!Number.isFinite(value) || value < 0) return 0.08;
        if (value <= 1) return 0.12;
        if (value <= 5) return 0.28;
        if (value <= 10) return 0.45;
        if (value <= 15) return 0.62;
        if (value <= 30) return 0.8;
        return 1;
    };

    const getPointColor = (level) => {
        const value = Number(level);

        if (!Number.isFinite(value) || value < 0) return "#7077E8";
        if (value <= 1) return "#7077E8";
        if (value <= 5) return "#55B9F0";
        if (value <= 10) return "#55D96A";
        if (value <= 15) return "#E8DE49";
        if (value <= 30) return "#F3A43B";
        return "#E95A33";
    };

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [hist, open] = await Promise.all([
                    fetch(`${BASE_URL}/api/get-map-levels`).then((res) => res.json()),
                    fetch(`${BASE_URL}/api/get-open-source-data`).then((res) => res.json()),
                ]);

                const normalize = (rows) =>
                    rows
                        .filter(
                            (p) =>
                                p &&
                                p.latitude !== null &&
                                p.longitude !== null &&
                                !Number.isNaN(Number(p.latitude)) &&
                                !Number.isNaN(Number(p.longitude))
                        )
                        .map((p) => ({
                            lat: Number(p.latitude),
                            lng: Number(p.longitude),
                            level: Number(p.level) || 0,
                        }));

                setHistoricalData(normalize(hist));
                setOpenSourceData(normalize(open));
            } catch (err) {
                console.error("Error fetching map data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAll();
    }, [BASE_URL]);

    useEffect(() => {
        if (!mapElementRef.current || mapRef.current) return;

        const map = L.map(mapElementRef.current, {
            zoomControl: false,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            wheelDebounceTime: 35,
            wheelPxPerZoomLevel: 90,
            boxZoom: true,
            dragging: true,
        }).setView([41.1415, -73.3579], 12);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
        }).addTo(map);

        L.control.zoom({ position: "bottomright" }).addTo(map);

        mapRef.current = map;

        const refreshMapSize = () => {
            window.requestAnimationFrame(() => {
                map.invalidateSize({ pan: false });
            });
        };

        const resizeObserver = new ResizeObserver(refreshMapSize);
        resizeObserver.observe(mapElementRef.current);

        window.addEventListener("resize", refreshMapSize);
        refreshMapSize();

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", refreshMapSize);
            map.remove();
            mapRef.current = null;
        };
    }, []);

    const selectedData = useMemo(() => {
        return layerType === "historical" ? historicalData : openSourceData;
    }, [layerType, historicalData, openSourceData]);

    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        activeLayersRef.current.forEach((layer) => {
            if (layer && map.hasLayer(layer)) {
                map.removeLayer(layer);
            }
        });

        activeLayersRef.current = [];

        if (!selectedData.length) return;

        if (viewMode === "heatmap") {
            const heatPoints = selectedData.map((p) => [
                p.lat,
                p.lng,
                normalizeLeadIntensity(p.level),
            ]);

            const heat = L.heatLayer(heatPoints, {
                radius: 28,
                blur: 22,
                minOpacity: 0.32,
                maxZoom: 17,
                gradient: {
                    0.0: "#7077E8",
                    0.2: "#55B9F0",
                    0.4: "#55D96A",
                    0.6: "#E8DE49",
                    0.8: "#F3A43B",
                    1.0: "#E95A33",
                },
            });

            heat.addTo(map);
            activeLayersRef.current = [heat];
        } else {
            const dots = selectedData.map((p) => {
                const marker = L.circleMarker([p.lat, p.lng], {
                    radius: 7,
                    weight: 1.3,
                    color: COLORS.navy,
                    fillColor: getPointColor(p.level),
                    fillOpacity: 0.82,
                });

                marker.bindPopup(
                    `<div style="font-family:Arial,sans-serif;color:${COLORS.navy};min-width:150px;">
            <strong>LeadWatch Data Point</strong><br/>
            ${
                        layerType === "historical"
                            ? "Historical data"
                            : "Approved community report"
                    }<br/>
            Lead level: ${p.level} ppb
          </div>`
                );

                marker.addTo(map);
                return marker;
            });

            activeLayersRef.current = dots;
        }
    }, [selectedData, viewMode, layerType]);

    const toggleButtonSx = (selected) => ({
        width: "100%",
        py: "3%",
        borderRadius: "999px",
        border: `1.5px solid ${selected ? COLORS.navy : COLORS.border}`,
        bgcolor: selected ? COLORS.navy : "transparent",
        color: selected ? COLORS.white : COLORS.navy,
        fontFamily: FONT,
        fontWeight: 600,
        fontSize: "0.98rem",
        textTransform: "none",
        transition: "all 0.18s ease",
        "&:hover": {
            bgcolor: selected ? COLORS.navy : "rgba(197,255,247,0.45)",
            borderColor: COLORS.navy,
        },
    });

    return (
        <Box sx={{ width: "100%", bgcolor: COLORS.white }}>
            {/* HEADER */}
            <Container
                maxWidth={false}
                sx={{
                    width: "90%",
                    mx: "auto",
                    px: "0%",
                    pt: { xs: "5%", md: "3%" },
                    pb: { xs: "3%", md: "2%" },
                }}
            >
                <Typography
                    sx={{
                        fontFamily: FONT,
                        fontWeight: 800,
                        color: COLORS.navy,
                        fontSize: { xs: "0.95rem", md: "1.05rem" },
                        letterSpacing: "0.025em",
                    }}
                >
                    PUBLIC DATA MAP
                </Typography>
            </Container>

            {/* MAP LENS + CONTROLS */}
            <Container
                maxWidth={false}
                sx={{
                    width: { xs: "94%", sm: "92%", md: "90%" },
                    mx: "auto",
                    px: "0%",
                    pb: { xs: "5%", md: "3%" },
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: { xs: "100%", lg: "64% 36%" },
                        alignItems: "stretch",
                        overflow: "hidden",
                        isolation: "isolate",
                        borderRadius: { xs: "18px", md: "24px" },
                        border: "1px solid rgba(11,43,74,0.08)",
                        bgcolor: COLORS.white,
                    }}
                >
                    {/* FIXED MAP LENS */}
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            minWidth: 0,
                            aspectRatio: { xs: "4 / 3", sm: "16 / 10", lg: "16 / 9" },
                            overflow: "hidden",
                            contain: "layout paint",
                            isolation: "isolate",
                            bgcolor: "#E8ECEF",
                            zIndex: 0,

                            "& .leaflet-container": {
                                position: "absolute !important",
                                inset: "0 !important",
                                width: "100% !important",
                                height: "100% !important",
                                maxWidth: "100% !important",
                                maxHeight: "100% !important",
                                overflow: "hidden !important",
                                zIndex: "0 !important",
                            },

                            "& .leaflet-map-pane": {
                                zIndex: "1 !important",
                            },

                            "& .leaflet-control-zoom": {
                                zIndex: "1000 !important",
                            },

                            "& .leaflet-control-attribution": {
                                fontSize: "0.68rem",
                            },

                            "& .leaflet-control-zoom a": {
                                color: COLORS.navy,
                                backgroundColor: "rgba(247,247,245,0.96)",
                                borderColor: "rgba(11,43,74,0.15)",
                            },

                            "& .leaflet-control-zoom a:hover": {
                                backgroundColor: COLORS.aqua,
                            },
                        }}
                    >
                        <Box
                            ref={mapElementRef}
                            sx={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                overflow: "hidden",
                                filter: isLoading ? "blur(3px)" : "none",
                                transition: "filter 0.25s ease",
                            }}
                        />

                        {isLoading && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    inset: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    zIndex: 50,
                                    bgcolor: "rgba(247,247,245,0.35)",
                                    backdropFilter: "blur(2px)",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: FONT,
                                        color: COLORS.navy,
                                        fontWeight: 700,
                                        fontSize: "1rem",
                                        bgcolor: "rgba(247,247,245,0.9)",
                                        px: "3%",
                                        py: "1.5%",
                                        borderRadius: "999px",
                                    }}
                                >
                                    Loading map data...
                                </Typography>
                            </Box>
                        )}

                        <Box
                            sx={{
                                position: "absolute",
                                top: "3%",
                                right: "3%",
                                zIndex: 500,
                                bgcolor: "rgba(247,247,245,0.9)",
                                backdropFilter: "blur(6px)",
                                px: "2.2%",
                                py: "1.1%",
                                borderRadius: "999px",
                                pointerEvents: "none",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    color: COLORS.navy,
                                    fontSize: "0.72rem",
                                    fontWeight: 600,
                                }}
                            >
                                Scroll to zoom • drag to move
                            </Typography>
                        </Box>

                        {/* LEGEND */}
                        <Box
                            sx={{
                                position: "absolute",
                                left: "3%",
                                bottom: "4%",
                                zIndex: 400,
                                width: { xs: "72%", sm: "42%", md: "36%" },
                                bgcolor: "rgba(247,247,245,0.95)",
                                backdropFilter: "blur(8px)",
                                borderRadius: "18px",
                                p: "2.2%",
                                boxShadow: "0 8px 26px rgba(11,43,74,0.12)",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    color: COLORS.navy,
                                    fontWeight: 700,
                                    fontSize: "0.86rem",
                                    mb: "3%",
                                }}
                            >
                                Lead level
                            </Typography>

                            <Box
                                sx={{
                                    height: "10px",
                                    borderRadius: "999px",
                                    background:
                                        "linear-gradient(to right, #7077E8 0%, #55B9F0 20%, #55D96A 40%, #E8DE49 60%, #F3A43B 80%, #E95A33 100%)",
                                }}
                            />

                            <Box
                                sx={{
                                    mt: "3%",
                                    display: "grid",
                                    gridTemplateColumns: "repeat(6, 1fr)",
                                    gap: "1%",
                                }}
                            >
                                {["0–1", "1–5", "5–10", "10–15", "15–30", "30+"].map(
                                    (range) => (
                                        <Typography
                                            key={range}
                                            sx={{
                                                fontFamily: FONT,
                                                color: COLORS.textSoft,
                                                fontSize: "0.67rem",
                                                textAlign: "center",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {range}
                                        </Typography>
                                    )
                                )}
                            </Box>

                            <Typography
                                sx={{
                                    mt: "2%",
                                    fontFamily: FONT,
                                    color: COLORS.textSoft,
                                    fontSize: "0.66rem",
                                    textAlign: "right",
                                }}
                            >
                                ppb
                            </Typography>
                        </Box>
                    </Box>

                    {/* CONTROLS — NEVER COVERED BY MAP */}
                    <Box
                        sx={{
                            position: "relative",
                            zIndex: 5,
                            minWidth: 0,
                            width: "100%",
                            bgcolor: COLORS.white,
                            px: { xs: "7%", lg: "9%" },
                            py: { xs: "7%", lg: "8%" },
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    color: COLORS.navy,
                                    fontWeight: 700,
                                    lineHeight: 1.35,
                                    fontSize: { xs: "1.2rem", lg: "1.4rem" },
                                    mb: "2.5%",
                                }}
                            >
                                300+ community lead reports
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    color: COLORS.textSoft,
                                    lineHeight: 1.55,
                                    fontSize: { xs: "0.95rem", lg: "0.98rem" },
                                    mb: "7%",
                                }}
                            >
                                Many reports remain private. Only reviewed and approved
                                submissions appear on this public map.
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    color: COLORS.navy,
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    mb: "3%",
                                }}
                            >
                                Change the view
                            </Typography>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "48% 48%",
                                    gap: "4%",
                                    mb: "7%",
                                }}
                            >
                                <Button
                                    onClick={() => setViewMode("heatmap")}
                                    sx={toggleButtonSx(viewMode === "heatmap")}
                                >
                                    Heatmap
                                </Button>

                                <Button
                                    onClick={() => setViewMode("dots")}
                                    sx={toggleButtonSx(viewMode === "dots")}
                                >
                                    Dots
                                </Button>
                            </Box>

                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    color: COLORS.navy,
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    mb: "3%",
                                }}
                            >
                                Data layer
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                    mb: "7%",
                                }}
                            >
                                <Button
                                    onClick={() => setLayerType("historical")}
                                    sx={toggleButtonSx(layerType === "historical")}
                                >
                                    Historical data
                                </Button>

                                <Button
                                    onClick={() => setLayerType("open")}
                                    sx={toggleButtonSx(layerType === "open")}
                                >
                                    Approved reports
                                </Button>
                            </Box>

                            <Box
                                sx={{
                                    bgcolor: COLORS.terracotta,
                                    borderRadius: "22px",
                                    px: "7%",
                                    py: "6%",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: FONT,
                                        color: COLORS.navy,
                                        fontWeight: 700,
                                        fontSize: { xs: "1.1rem", lg: "1.2rem" },
                                        mb: "3%",
                                    }}
                                >
                                    Connecticut report coming soon
                                </Typography>

                                <Typography
                                    sx={{
                                        fontFamily: FONT,
                                        color: COLORS.navy,
                                        lineHeight: 1.5,
                                        fontSize: { xs: "0.92rem", lg: "0.96rem" },
                                        mb: "4%",
                                    }}
                                >
                                    We are building a broader picture of lead risk across
                                    Connecticut by combining community reports with more
                                    structured testing and outreach.
                                </Typography>

                                <Box
                                    sx={{
                                        display: "grid",
                                        gap: "3%",
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontFamily: FONT,
                                                color: COLORS.navy,
                                                fontWeight: 700,
                                                fontSize: "0.9rem",
                                                mb: "1%",
                                            }}
                                        >
                                            Community Water Drives
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontFamily: FONT,
                                                color: COLORS.navy,
                                                lineHeight: 1.45,
                                                fontSize: "0.86rem",
                                                opacity: 0.9,
                                            }}
                                        >
                                            Free local screening events help residents test samples,
                                            learn about lead exposure, and connect with next-step
                                            resources.
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography
                                            sx={{
                                                fontFamily: FONT,
                                                color: COLORS.navy,
                                                fontWeight: 700,
                                                fontSize: "0.9rem",
                                                mb: "1%",
                                            }}
                                        >
                                            School & public-facility testing
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontFamily: FONT,
                                                color: COLORS.navy,
                                                lineHeight: 1.45,
                                                fontSize: "0.86rem",
                                                opacity: 0.9,
                                            }}
                                        >
                                            We are expanding testing across schools and public spaces,
                                            with concerning results reviewed and confirmed before
                                            public identification.
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography
                                            sx={{
                                                fontFamily: FONT,
                                                color: COLORS.navy,
                                                fontWeight: 700,
                                                fontSize: "0.9rem",
                                                mb: "1%",
                                            }}
                                        >
                                            Statewide analysis
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontFamily: FONT,
                                                color: COLORS.navy,
                                                lineHeight: 1.45,
                                                fontSize: "0.86rem",
                                                opacity: 0.9,
                                            }}
                                        >
                                            These efforts will feed into a larger Connecticut report
                                            focused on patterns, priorities, and where future testing
                                            may be most useful.
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>

            {/* PRIVACY BAND */}
            <Box
                sx={{
                    width: "100%",
                    bgcolor: COLORS.navy,
                    px: { xs: "6%", md: "5%" },
                    py: { xs: "8%", md: "4%" },
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
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "100%", md: "48% 48%" },
                            gap: { xs: "8%", md: "4%" },
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    color: COLORS.aqua,
                                    fontWeight: 800,
                                    fontSize: { xs: "0.95rem", md: "1rem" },
                                    mb: "2%",
                                }}
                            >
                                PRIVACY & REVIEW
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    color: COLORS.white,
                                    lineHeight: 1.7,
                                    fontSize: { xs: "1rem", md: "1.06rem" },
                                }}
                            >
                                Many community reports remain private. LeadWatch reviews
                                submissions before any result is considered for the public map.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    color: COLORS.aqua,
                                    fontWeight: 800,
                                    fontSize: { xs: "0.95rem", md: "1rem" },
                                    mb: "2%",
                                }}
                            >
                                WHAT THIS MAP SHOWS
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    color: COLORS.white,
                                    lineHeight: 1.7,
                                    fontSize: { xs: "1rem", md: "1.06rem" },
                                }}
                            >
                                Historical records and approved community reports are shown for
                                exploration, education, and awareness. This is not a complete
                                archive of every LeadWatch submission.
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
                    gridTemplateColumns: { xs: "100%", md: "50% 50%" },
                }}
            >
                <Box
                    component={RouterLink}
                    to="/"
                    sx={{
                        minHeight: "150px",
                        bgcolor: COLORS.mist,
                        display: "flex",
                        alignItems: "center",
                        px: { xs: "8%", md: "14%" },
                        textDecoration: "none",
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: FONT,
                            color: COLORS.navy,
                            fontWeight: 500,
                            fontSize: { xs: "1.8rem", md: "2.1rem" },
                        }}
                    >
                        Get to know our work
                    </Typography>
                </Box>

                <Box
                    component={RouterLink}
                    to="/report"
                    sx={{
                        minHeight: "150px",
                        bgcolor: COLORS.terracotta,
                        display: "flex",
                        alignItems: "center",
                        px: { xs: "8%", md: "14%" },
                        textDecoration: "none",
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: FONT,
                            color: COLORS.navy,
                            fontWeight: 500,
                            fontSize: { xs: "1.8rem", md: "2.1rem" },
                        }}
                    >
                        → Report data
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Map;
