import React, { useState } from "react";
import "./tab_css/report.css"; // CSS for the Report tab

const Report = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="report-container">
      <h1>Report PFAS Levels</h1>
      <button className="open-modal-button" onClick={() => setModalOpen(true)}>
        Report PFAS Levels
      </button>

      {/* Modal for reporting */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Report PFAS Levels</h3>
              <button className="close-button" onClick={() => setModalOpen(false)}>
                ✖
              </button>
            </div>
            <div className="modal-body">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter location"
              />
              <label htmlFor="lead-level">PFAS Level (ppm):</label>
              <input
                type="number"
                id="lead-level"
                name="lead-level"
                placeholder="Enter PFAS level"
              />
              <label htmlFor="date">Date Tested:</label>
              <input type="date" id="date" name="date" />
            </div>
            <div className="modal-footer">
              <button className="close-button" onClick={() => setModalOpen(false)}>
                Close
              </button>
              <button className="save-button">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;