import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat/dist/leaflet-heat.js";

export default function Map() {
    const [layerType, setLayerType] = useState("historical");
    const [historicalData, setHistoricalData] = useState([]);
    const [openSourceData, setOpenSourceData] = useState([]);
    const [aiData, setAiData] = useState([]);

    const mapRef = useRef<L.Map | null>(null);
    const heatLayersRef = useRef<{
        historical: L.Layer | null,
        open: L.Layer | null,
        ai: L.Layer | null,
    }>({
        historical: null,
        open: null,
        ai: null,
    });
    const BASE_URL =
        window.location.hostname === "localhost"
            ? "http://localhost:3001"
            : "http://18.116.67.201:3001";

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [hist, open, ai] = await Promise.all([
                    fetch(`${BASE_URL}/api/get-map-levels`).then((res) => res.json()),
                    fetch(`${BASE_URL}/api/get-open-source-data`).then((res) => res.json()),
                    fetch(`${BASE_URL}/api/get-open-source-data`).then((res) => res.json()),
                ]);

                setHistoricalData(hist.map((p: { latitude: number; longitude: number; level?: number }) => [p.latitude, p.longitude, p.level || 0.5]));
                setOpenSourceData(open.map((p: { latitude: number; longitude: number; level?: number }) => [p.latitude, p.longitude, p.level || 0.5]));
                setAiData(ai.map((p: { latitude: number; longitude: number; level?: number }) => [p.latitude, p.longitude, p.level || 0.5]));
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
        <div>
            <div id="map" className="w-full h-[400px] z-1" />
            hello
        </div>
    )
}