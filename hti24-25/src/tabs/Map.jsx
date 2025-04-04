import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./tab_css/map.css";
import "leaflet.heat/dist/leaflet-heat.js";

function Map() {
    const [heatData, setHeatData] = useState([]);

    useEffect(() => {
        // Fetch lead data from backend
        fetch("http://localhost:3001/api/get-map-levels")
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                // Format the data for Leaflet heat layer: [lat, lng, intensity]
                const formatted = data.map((point) => [
                    point.latitude,
                    point.longitude,
                    point.level || 0.5, // fallback intensity
                ]);
                setHeatData(formatted);
            })
            .catch((err) => console.error("Failed to fetch lead data:", err));
    }, []);

    useEffect(() => {
        const map = L.map("map").setView([50.505, 30.5], 5);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Add heat layer if data is available
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
    }, [heatData]); // Re-run map render when data is fetched

    return (
        <div className="map-container">
            <div id="map"></div>
        </div>
    );
}

export default Map;
