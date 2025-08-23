import React, { useState } from "react";

const Phone = () => {
  
  const [phone, setPhone] = useState({
    brand: "Apple",
    model: "iPhone 15",
    price: 79999
  });

  // to increase price
  const increasePrice = () => {
    setPhone((prevPhone) => ({
      ...prevPhone,
      price: prevPhone.price + 1000
    }));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>📱 Phone Details</h2>
      <p><strong>Brand:</strong> {phone.brand}</p>
      <p><strong>Model:</strong> {phone.model}</p>
      <p><strong>Price:</strong> ₹{phone.price}</p>

      <button 
        onClick={increasePrice} 
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        Increase Price
      </button>
    </div>
  );
};

export default Phone;
