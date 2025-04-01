import React, { useEffect } from "react";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import "./tab_css/map.css"; // Importing the CSS for styling
import "leaflet.heat/dist/leaflet-heat.js";

function Map() {
  useEffect(() => {
    const map = L.map("map").setView([50.505, 30.5], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    var heat = L.heatLayer(
      [
        [50.5, 30.5, 0.5],
        [50.6, 30.4, 0.2],
        [50.4, 30.5, 0.3],
        [50.5, 30.6, 0.7],
        [50.6, 30.5, 0.5],
      ],
      { radius: 25, blur: 15, minOpacity: 0.5 }
    ).addTo(map);

    return () => {
      map.remove(); // Cleanup the map when the component unmounts
    };
  }, []);
  return (
    <div className="map-container">
      <div id="map"></div>
    </div>
  );
}

export default Map;
