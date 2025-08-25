import React from "react";
import { usePowerCut } from "../context/PowerCutContext";

const AnnouncementList = () => {
    // Access announcements from context
    const { announcements } = usePowerCut();

    return (
        <div className="container my-4">
            <h3>Power Cut Announcements</h3>
            <div
                style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "5px",
                }}
            >
                {announcements.length === 0 ? (
                    <p>No announcements yet.</p>
                ) : (
                    announcements.map((item) => (
                        <div
                            key={item.id}
                            className="border rounded p-2 mb-2 bg-light"
                        >
                            <p>
                                <strong>Street:</strong> {item.street}
                            </p>
                            <p>
                                <strong>Message:</strong> {item.message}
                            </p>
                            <p>
                                <strong>Time:</strong> {item.time}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AnnouncementList;
