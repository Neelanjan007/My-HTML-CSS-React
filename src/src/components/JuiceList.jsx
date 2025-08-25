import React from "react";
import Juice from "./Juice";

/** Renders a Juice Menu table using map() over an array of juice objects */
const JuiceList = ({ items = [] }) => {
    const wrapper = {
        maxWidth: 700,
        margin: "32px auto",
        fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    };
    const title = { textAlign: "center", fontSize: 40, marginBottom: 16 };
    const table = { width: "100%", borderCollapse: "collapse" };
    const headCell = {
        border: "2px solid #999",
        padding: "12px 16px",
        fontSize: 20,
        fontWeight: 700,
        textAlign: "left",
    };

    return (
        <div style={wrapper}>
            <h1 style={title}>🥤 Juice Menu</h1>

            <table style={table}>
                <thead>
                    <tr>
                        <th style={headCell}>ID</th>
                        <th style={headCell}>Juice Name</th>
                        <th style={headCell}>Price</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((j) => (
                        <Juice key={j.id} id={j.id} name={j.name} price={j.price} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JuiceList;
