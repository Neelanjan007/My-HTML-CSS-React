import React from "react";

export default function ErrorComponent() {
    return (
        <div style={styles.card}>
            <p>⚠️ Error fetching product details</p>
        </div>
    );
}

const styles = {
    card: {
        padding: "20px",
        backgroundColor: "#ffe6e6",
        border: "1px solid #ff4d4d",
        textAlign: "center",
        borderRadius: "8px",
        color: "#b30000",
        fontSize: "18px",
    },
};
