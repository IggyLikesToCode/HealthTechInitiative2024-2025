import React, { useState } from "react";
import axios from "axios";
import "./tab_css/report.css"; // CSS for the Report tab

const Report = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [location, setLocation] = useState("");
    const [level, setLevel] = useState("");
    const [date, setDate] = useState("");

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

            const res = await axios.post("http://localhost:3001/api/report-lead", payload);

            if (res.data.success) {
                alert("✅ Lead report submitted!");
                setModalOpen(false);
                setLocation("");
                setLevel("");
                setDate("");
            } else {
                alert("❌ Submission failed.");
            }
        } catch (err) {
            console.error("Error submitting lead report:", err);
            alert("❌ Error submitting lead report.");
        }
    };

    return (
        <div className="report-container">
            <h1>Report Lead Levels</h1>
            <button className="open-modal-button" onClick={() => setModalOpen(true)}>
                Report Lead Levels
            </button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Report Lead Levels</h3>
                            <button className="close-button" onClick={() => setModalOpen(false)}>
                                ✖
                            </button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="location">Location:</label>
                            <input
                                type="text"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Enter location"
                            />
                            <label htmlFor="lead-level">Lead Level (ppm):</label>
                            <input
                                type="number"
                                id="lead-level"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                placeholder="Enter lead level"
                            />
                            <label htmlFor="date">Date Tested:</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button className="close-button" onClick={() => setModalOpen(false)}>
                                Close
                            </button>
                            <button className="save-button" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Report;
