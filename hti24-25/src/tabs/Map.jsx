import React, { useEffect } from "react";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import "./tab_css/map.css"; // Importing the CSS for styling

function Map() {
    useEffect(() => {
        const map = L.map("map").setView([51.505, -0.09], 5); // [Lat, Lng], Zoom Level

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        return () => {
            map.remove(); // Cleanup the map when the component unmounts
        }
    }, []);
    return (
        <div className="map-container">
            <div id="map"></div>
        </div>
    );
}

export default Map;
