import React from "react";

export default function ProductComponent({ product }) {
    return (
        <div style={styles.card}>
            <h2>Electronic Product Details</h2>
            <p><b>Name:</b> {product.name}</p>
            <p><b>Brand:</b> {product.brand}</p>
            <p><b>Price:</b> ₹{product.price}</p>
            <p><b>Category:</b> {product.category}</p>
            <p><b>Brand:</b> {product.price > 50000 ? "Premium Product" : "Budget Product"}</p>
            <p><b>Warranty:</b> {product.warranty > 0 ? `${product.warranty} years` : "No Warranty"}</p>
            <p>{product.availability ? "✅ In Stock" : "❌ Out of Stock"}</p>
            {product.category === "Laptop" && <p>🎒 Free Laptop Bag Offer</p>}
        </div>
    );
}

const styles = {
    card: {
        padding: "20px",
        backgroundColor: "#f5f5f5",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginTop: "15px",
        fontSize: "16px",
    },
};
