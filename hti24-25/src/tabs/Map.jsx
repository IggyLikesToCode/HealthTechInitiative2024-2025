import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat/dist/leaflet-heat.js";
import { Box, Typography, Select, MenuItem, Paper } from "@mui/material";

function Map() {
    const [layerType, setLayerType] = useState("historical");
    const [historicalData, setHistoricalData] = useState([]);
    const [openSourceData, setOpenSourceData] = useState([]);
    const [aiData, setAiData] = useState([]);

    const mapRef = useRef(null);
    const heatLayersRef = useRef({
        historical: null,
        open: null,
        ai: null,
    });
    const BASE_URL =
        window.location.hostname === "localhost"
            ? "http://localhost:3001"
            : "http://18.191.99.100:3001";


    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [hist, open, ai] = await Promise.all([
                    fetch(`${BASE_URL}/api/get-map-levels`).then((res) => res.json()),
                    fetch(`${BASE_URL}/api/get-open-source-data`).then((res) => res.json()),
                    fetch(`${BASE_URL}/api/get-open-source-data`).then((res) => res.json()),
                ]);

                setHistoricalData(hist.map(p => [p.latitude, p.longitude, p.level || 0.5]));
                setOpenSourceData(open.map(p => [p.latitude, p.longitude, p.level || 0.5]));
                setAiData(ai.map(p => [p.latitude, p.longitude, p.level || 0.5]));
            } catch (err) {
                console.error("Error fetching map data:", err);
            }
        };

        fetchAll();
    }, []);

    useEffect(() => {
        if (mapRef.current) return;

        const map = L.map("map", { zoomControl: false }).setView(
            [40.678, -96.944],
            4
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        mapRef.current = map;
    }, []);

    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        if (historicalData.length > 0 && !heatLayersRef.current.historical) {
            heatLayersRef.current.historical = L.heatLayer(historicalData, { radius: 25, blur: 15, minOpacity: 0.5 });
            if (layerType === "historical") map.addLayer(heatLayersRef.current.historical);
        }

        if (openSourceData.length > 0 && !heatLayersRef.current.open) {
            heatLayersRef.current.open = L.heatLayer(openSourceData, { radius: 25, blur: 15, minOpacity: 0.5 });
            if (layerType === "open") map.addLayer(heatLayersRef.current.open);
        }

        if (aiData.length > 0 && !heatLayersRef.current.ai) {
            heatLayersRef.current.ai = L.heatLayer(aiData, { radius: 25, blur: 15, minOpacity: 0.5 });
            if (layerType === "ai") map.addLayer(heatLayersRef.current.ai);
        }

    }, [historicalData, openSourceData, aiData]);

    
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        Object.entries(heatLayersRef.current).forEach(([key, layer]) => {
            if (!layer) return;
            if (key === layerType) {
                map.addLayer(layer);
            } else {
                map.removeLayer(layer);
            }
        });
    }, [layerType]);

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 4 }}>
            <Box
                sx={{
                    position: "relative",
                    width: "80%",
                    height: "500px",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Box
                    id="map"
                    sx={{
                        width: "100%",
                        height: "100%",
                        zIndex: 1,
                    }}
                />

                <Paper
                    elevation={4}
                    sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        zIndex: 1000,
                        backgroundColor: "#f3f3f3",
                        borderRadius: "12px",
                        p: 2,
                        minWidth: "180px",
                    }}
                >
                    <Typography
                        variant="subtitle2"
                        sx={{ mb: 1, fontWeight: 600 }}
                        color="textPrimary"
                    >
                        Data Layer
                    </Typography>
                    <Select
                        value={layerType}
                        onChange={(e) => setLayerType(e.target.value)}
                        fullWidth
                        sx={{
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            "& .MuiSelect-select": {
                                padding: "8px 12px",
                                fontWeight: 500,
                            },
                            "& fieldset": {
                                borderColor: "#93c5fd",
                            },
                            "&:hover fieldset": {
                                borderColor: "#3b82f6",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#3b82f6",
                                boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)",
                            },
                        }}
                        color="primary"
                    >
                        <MenuItem value="historical">Historical Data</MenuItem>
                        <MenuItem value="open">Open Source Reports</MenuItem>
                        <MenuItem value="ai">AI Risk Assessment</MenuItem>
                    </Select>
                </Paper>

                <Box
                    sx={{
                        position: "absolute",
                        bottom: 16,
                        right: 16,
                        backgroundColor: "white",
                        p: 1,
                        borderRadius: "8px",
                        boxShadow: 2,
                        width: 180,
                        zIndex: 1000,
                    }}
                >
                    <Typography variant="caption" color="textPrimary">
                        Contamination Level
                    </Typography>
                    <Box
                        sx={{
                            height: "10px",
                            borderRadius: "5px",
                            mt: 0.5,
                            background: "linear-gradient(to right, #999ef4 0%, #91b9f6 16.67%, #7bfa69 33.33%, #fcf151 50%, #feb43b 66.67%, #fe6020 100%)",
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: 12,
                        }}
                    >
                        <span>Low</span>
                        <span>High</span>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Map;
