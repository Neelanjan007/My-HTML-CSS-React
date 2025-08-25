import React from "react";
import PropTypes from "prop-types";

const CanteenItem = ({ name, price, category, available }) => {
  const availOk = String(available).toLowerCase() === "yes";

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title mb-2">{name}</h5>
        <p className="card-text mb-1">
          <strong>Price:</strong> ₹{price}
        </p>
        <p className="card-text mb-1">
          <strong>Category:</strong> {category}
        </p>
        <span className={`badge ${availOk ? "bg-success" : "bg-danger"}`}>
          {availOk ? "Available" : "Not Available"}
        </span>
      </div>
    </div>
  );
};

CanteenItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  available: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

export default CanteenItem;
