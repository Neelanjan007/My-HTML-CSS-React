import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Electronics = () => {
  
  const [name, setName] = useState("Laptop");
  const [brand, setBrand] = useState("Dell");
  const [price, setPrice] = useState(5500);

  
  const handleChangeBrand = () => {
    setBrand("HP");
  };

  const handleIncreasePrice = () => {
    setPrice(price + 500); 
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h3 className="card-title text-center mb-4">
          ⚡ Electronic Item Details
        </h3>
        <div className="card-body text-center">
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Brand:</strong> {brand}
          </p>
          <p>
            <strong>Price:</strong> ₹{price}
          </p>

          <div className="d-flex justify-content-center gap-3 mt-3">
            <button
              className="btn btn-secondary"
              onClick={handleChangeBrand}
            >
              Change Brand
            </button>
            <button
              className="btn btn-primary"
              onClick={handleIncreasePrice}
            >
              Increase Price
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Electronics;
