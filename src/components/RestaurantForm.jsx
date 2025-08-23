import React, { useState, useEffect } from "react";

export default function RestaurantForm() {
    const [formData, setFormData] = useState({
        restaurantName: "",
        ownerName: "",
        email: "",
        contact: "",
        address: "",
        cuisineType: "",
        openingHours: ""
    });

    const [submittedData, setSubmittedData] = useState(null);

    // ✅ 1. useEffect → Runs on every render
    useEffect(() => {
        console.log("Component rendered");
    });

    // ✅ 2. useEffect → Runs only once (on mount)
    useEffect(() => {
        console.log("Component mounted");
    }, []);

    // ✅ 3. useEffect → Runs whenever form data changes
    useEffect(() => {
        console.log("Form data updated:", formData);
    }, [formData]);

    // ✅ 4. Auto-save form data every 5 seconds (with cleanup)
    useEffect(() => {
        const interval = setInterval(() => {
            console.log("Auto-saving form data:", formData);
        }, 5000);

        return () => clearInterval(interval); // cleanup
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedData(formData);
    };

    return (
        <div style={styles.container}>
            <h1>🍴 Restaurant Registration Form</h1>
            <p>Welcome to Restaurant Registration 🏢</p>

            <form onSubmit={handleSubmit} style={styles.form}>
                <label>Restaurant Name</label>
                <input name="restaurantName" value={formData.restaurantName} onChange={handleChange} />

                <label>Owner Name</label>
                <input name="ownerName" value={formData.ownerName} onChange={handleChange} />

                <label>Email</label>
                <input name="email" value={formData.email} onChange={handleChange} />

                <label>Contact Number</label>
                <input name="contact" value={formData.contact} onChange={handleChange} />

                <label>Address</label>
                <input name="address" value={formData.address} onChange={handleChange} />

                <label>Cuisine Type</label>
                <input name="cuisineType" value={formData.cuisineType} onChange={handleChange} />

                <label>Opening Hours</label>
                <input name="openingHours" value={formData.openingHours} onChange={handleChange} />

                <button type="submit" style={styles.button}>Submit</button>
            </form>

            {submittedData && (
                <div style={styles.output}>
                    <h3>📂 Submitted Data (JSON)</h3>
                    <pre>{JSON.stringify(submittedData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: { padding: "20px", fontFamily: "Arial", maxWidth: "400px", margin: "auto" },
    form: { display: "flex", flexDirection: "column", gap: "10px" },
    button: { padding: "10px", background: "#000", color: "#fff", border: "none", borderRadius: "5px" },
    output: { marginTop: "20px", background: "#f5f5f5", padding: "10px", borderRadius: "5px" }
};
