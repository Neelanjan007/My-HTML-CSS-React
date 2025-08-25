import React, { Component } from "react";

// Child Component - MenuItem
class MenuItem extends Component {
    render() {
        const { name, price, category, available } = this.props;
        return (
            <li>
                {name} - ₹ {price} ({category}),{" "}
                {available ? "Available" : "Not Available"}
            </li>
        );
    }
}

// Parent Component - Restaurant
class Restaurant extends Component {
    render() {
        const restaurantName = "Spice Hub";
        const location = "Block B, First Floor";
        const openHours = "10:00 AM - 10:00 PM";

        return (
            <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
                <h1>Restaurant Name: {restaurantName}</h1>
                <p>Location: {location}</p>
                <p>Open Hours: {openHours}</p>

                <h2>Restaurant Menu:</h2>
                <ul>
                    <MenuItem
                        name="Paneer Butter Masala"
                        price={150}
                        category="Main Course"
                        available={true}
                    />
                    <MenuItem
                        name="Chicken Biryani"
                        price={200}
                        category="Main Course"
                        available={true}
                    />
                    <MenuItem
                        name="Masala Dosa"
                        price={80}
                        category="Breakfast"
                        available={true}
                    />
                    <MenuItem
                        name="Gulab Jamun"
                        price={40}
                        category="Dessert"
                        available={false}
                    />
                    <MenuItem
                        name="Veg Thali"
                        price={120}
                        category="Combo"
                        available={true}
                    />
                </ul>
            </div>
        );
    }
}


export default Restaurant;
