import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat/dist/leaflet-heat.js";
import { Box, Typography, Select, MenuItem, Paper } from "@mui/material";

function Map() {
  const [layerType, setLayerType] = useState("historical");
  const [heatData, setHeatData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/get-map-levels`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((point) => [
          point.latitude,
          point.longitude,
          point.level || 0.5,
        ]);
        setHeatData(formatted);
      })
      .catch((err) => console.error("Failed to fetch lead data:", err));
  }, [layerType]);

  useEffect(() => {
    const map = L.map("map", { zoomControl: false }).setView(
      [40.678, -96.944],
      4
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    if (heatData.length > 0) {
      L.heatLayer(heatData, {
        radius: 25,
        blur: 15,
        minOpacity: 0.5,
      }).addTo(map);
    }

    return () => {
      map.remove();
    };
  }, [heatData]);

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

        {/* Floating Settings Panel */}
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
            <MenuItem value="historical" color="primary">
              Historical Data
            </MenuItem>
            <MenuItem value="open" color="primary">
              Open Source Reports
            </MenuItem>
            <MenuItem value="ai" color="primary">
              AI Risk Assessment
            </MenuItem>
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
              background: "linear-gradient(to right, #93c5fd, #1d4ed8)",
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
