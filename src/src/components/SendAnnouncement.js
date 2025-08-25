import React, { useState } from "react";
import { usePowerCut } from "../context/PowerCutContext";

const SendAnnouncement = () => {
    // Access the addAnnouncement function from context
    const { addAnnouncement } = usePowerCut();

    // Local state for form inputs
    const [street, setStreet] = useState("");
    const [message, setMessage] = useState("");

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation: both fields should be filled
        if (street.trim() === "" || message.trim() === "") {
            alert("Please fill out both fields.");
            return;
        }

        // Call context function to add announcement
        addAnnouncement(street, message);

        // Clear input fields
        setStreet("");
        setMessage("");
    };

    return (
        <div className="container my-4">
            <h2 className="mb-3">Street Power Cut Announcements</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Street Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Enter street name"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Message:</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter power cut details"
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                    Send Announcement
                </button>
            </form>
        </div>
    );
};

export default SendAnnouncement;
