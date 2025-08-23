import React from "react";

// Child A: displays the fruit list and lets user select a fruit
export const FruitList = ({ fruits, onSelectFruit }) => {
    return (
        <div style={styles.card}>
            <h3>Fruit List</h3>
            {fruits.map((fruit, index) => (
                <div
                    key={index}
                    style={styles.listItem}
                    onClick={() => onSelectFruit(fruit)} // pass selected fruit to parent
                >
                    {fruit}
                </div>
            ))}
        </div>
    );
};

// Child B: button to send new fruit ("Orange") back to parent (Child → Parent)
export const Sender = ({ onAddFruit }) => {
    return (
        <div style={styles.card}>
            <h3>Sender</h3>
            <button style={styles.button} onClick={onAddFruit}>
                Send Fruit
            </button>
        </div>
    );
};

// Child C: display the fruit selected by sibling (via parent state)
export const SelectedFruit = ({ fruit }) => {
    return (
        <div style={styles.card}>
            <h3>Selected Fruit</h3>
            <p>{fruit || "No fruit selected yet"}</p>
        </div>
    );
};

// Shared styles for all components
const styles = {
    card: {
        border: "1px solid #ccc",
        padding: "20px",
        margin: "10px",
        borderRadius: "8px",
        minWidth: "150px",
    },
    button: {
        padding: "10px 15px",
        border: "none",
        background: "#ddd",
        borderRadius: "6px",
        cursor: "pointer",
    },
    listItem: {
        cursor: "pointer",
        margin: "5px 0",
    },
};
