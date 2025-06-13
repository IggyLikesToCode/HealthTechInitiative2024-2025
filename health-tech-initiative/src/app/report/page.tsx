"use client";

import { useState } from "react";
import axios from "axios";

export default function Report() {
    const BASE_URL =
        typeof window !== "undefined" && window.location.hostname === "localhost"
            ? "http://localhost:3001"
            : "http://18.116.67.201:3001";

    const [location, setLocation] = useState("");
    const [level, setLevel] = useState("");
    const [date, setDate] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async () => {
        try {
        const locationIqKey = "pk.4e7d542fb27c753e173543c95bf667e6";
        const geoRes = await axios.get(
            `https://us1.locationiq.com/v1/search.php?key=${locationIqKey}&q=${encodeURIComponent(location)}&format=json`
        );

        const { lat, lon } = geoRes.data[0];

        const payload = {
            location_name: location,
            level: parseFloat(level),
            date,
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            reported_by: "anonymous",
        };

        const res = await axios.post(`${BASE_URL}/api/report-lead`, payload);

        if (res.data.success) {
            const reportId = res.data.reportId;

            if (file) {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("reportId", reportId);

            const uploadRes = await axios.post(`${BASE_URL}/upload`, formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            });

            if (uploadRes.data.success) {
                alert("Report and image uploaded successfully!");
            } else {
                alert("Report submitted, but image upload failed.");
            }
            } else {
            alert("Report submitted successfully!");
            }

            setLocation("");
            setLevel("");
            setDate("");
            setFile(null);
        } else {
            alert("Report submission failed.");
        }
        } catch (err) {
        console.error("Error submitting lead report:", err);
        alert("Error submitting lead report.");
        }
    };

    return (
        <main className="flex w-full h-full flex-col items-center justify-start p-24">
            <h1 className="text-3xl font-bold mb-6">Report Lead Contamination</h1>
            <form className="w-full max-w-md space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div>
                    <label className="block text-sm font-bold">Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md bg-gray-100 p-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold">Lead Level</label>
                    <input
                        type="number"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md bg-gray-100 p-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md bg-gray-100 p-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold">Upload Image (optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setFile(e.target.files[0]);
                            } else {
                                setFile(null);
                            }
                        }}
                        className="mt-1 block file:bg-gray-100 file:p-2 file:px-4 file:mr-4 text-sm file:font-bold file:hover:bg-gray-200 file:transition file:rounded-md file:focus:border-blue-500 file:focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-hover transition text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit Report
                </button>
            </form>
        </main>
    )
}