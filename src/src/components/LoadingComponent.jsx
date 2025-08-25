import React from "react";

export default function LoadingComponent() {
    return (
        <div style={styles.card}>
            <p>Loading product details...</p>
        </div>
    );
}

const styles = {
    card: {
        padding: "20px",
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        textAlign: "center",
        borderRadius: "8px",
        fontSize: "18px",
    },
};
