import React from "react";
import CanteenItem from "./CanteenItem";

const CanteenMenu = () => {
  const canteen = {
    name: "Campus Food Court",
    location: "Block A, Ground Floor",
    hours: "8:00 AM - 8:00 PM",
  };


  const menu = [
    { id: 1, name: "Idli", price: 30, category: "Breakfast", available: "Yes" },
    { id: 2, name: "Dosa", price: 50, category: "Breakfast", available: "Yes" },
    { id: 3, name: "Vada", price: 20, category: "Snack", available: "No" },
    { id: 4, name: "Poori", price: 40, category: "Breakfast", available: "Yes" },
    { id: 5, name: "Meals", price: 120, category: "Lunch", available: "Yes" },
  ];

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 mb-4">
        <div className="card-body">
          <h2 className="card-title display-6">
            🍴 Canteen Name: {canteen.name}
          </h2>
          <p className="card-text mb-1"><strong>Location:</strong> {canteen.location}</p>
          <p className="card-text"><strong>Open Hours:</strong> {canteen.hours}</p>
          <hr />
          <h4 className="mb-3">Canteen Menu</h4>

          <div className="row g-3">
            {menu.map(item => (
              <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                <CanteenItem
                  name={item.name}
                  price={item.price}
                  category={item.category}
                  available={item.available}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanteenMenu;
