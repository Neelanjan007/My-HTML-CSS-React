
// import React from "react";
// import GroceryList from "./components/GroceryList";

// function App() {
//   return (
//     <div>
//       {/* You can pass initial items here */}
//       <GroceryList items={["Milk", "Bread", "Apples"]} />
//     </div>
//   );
// }

// export default App;



// Question 2: 

// import React from "react";
// import Car from "./components/Car";

// function App() {
//   return (
//     <div>
//       <h1>React Assignments</h1>

//       {/* Assignment 2: Car Component */}
//       <Car brand="Toyota" model="Fortuner" color="Black" year="2022" />
//     </div>
//   );
// }

// export default App;

// Question: 3

// import React from "react";
// import Phone from "./components/Phone";

// function App() {
//   return (
//     <div>
//       <h1>React Assignments</h1>

//       {/* Assignment 3: Phone Component */}
//       <Phone />
//     </div>
//   );
// }

// export default App;

// Question : 4

// import React from "react";
// import SweetList from "./components/SweetList";


// function App() {
//   return (
//     <div>
//       <SweetList />
//     </div>
//   );
// }

// export default App;

// Question : 5

// import React from "react";
// import Electronics from "./components/Electronics";

// function App() {
//   return (
//     <div>
//       <Electronics />
//     </div>
//   );
// }

// export default App;

// Question : 6

// import React from "react";
// import CanteenMenu from "./components/CanteenMenu";

// function App() {
//   return <CanteenMenu />;
// }

// export default App;

// Question : 7

// import React from "react";
// import JuiceList from "./components/JuiceList";

// function App() {
//   const juices = [
//     { id: 1, name: "Orange Juice", price: 80 },
//     { id: 2, name: "Apple Juice", price: 100 },
//     { id: 3, name: "Mango Juice", price: 120 },
//   ];

//   return <JuiceList items={juices} />;
// }

// export default App;
// Question: 16

// import React from "react";
// import MovieForm from "./components/MovieForm.jsx"; // import MovieForm component

// /****************************************************
//  * App Component (Function Component)
//  * -----------------------------------------------
//  * - Small wrapper around MovieForm
//  * - Includes a toggle button to show/hide MovieForm
//  * - This demonstrates componentWillUnmount (when hidden)
//  ****************************************************/
// function App() {
//   // Local state to show/hide the form
//   const [showForm, setShowForm] = React.useState(true);

//   return (
//     <div className="container py-3">
//       {/* Toggle Button */}
//       <div className="d-flex justify-content-end mb-2">
//         <button
//           className="btn btn-outline-secondary"
//           onClick={() => setShowForm((s) => !s)}
//         >
//           {showForm ? "Toggle Movie Form" : "Show Movie Form"}
//         </button>
//       </div>

//       {/* Conditionally render MovieForm.
//           When hidden, componentWillUnmount runs. */}
//       {showForm && <MovieForm />}
//     </div>
//   );
// }

// export default App;



// // Question : 21
// import React, { useState } from "react";
// import { FruitList, Sender, SelectedFruit } from "./components/FruitComponents.jsx";

// export default function App() {
//   // Parent holds the fruits state
//   const [fruits, setFruits] = useState(["Apple", "Mango"]);

//   // Holds the currently selected fruit (for sibling -> sibling)
//   const [selectedFruit, setSelectedFruit] = useState("");

//   // Child → Parent: adds "Orange" to fruits; auto-selects it for display
//   const addFruit = () => {
//     const newFruit = "Orange";
//     setFruits((prev) =>
//       prev.includes(newFruit) ? prev : [...prev, newFruit]
//     );
//     setSelectedFruit(newFruit);
//   };

//   // Sibling → Sibling: set selected fruit from FruitList
//   const handleSelectFruit = (fruit) => {
//     setSelectedFruit(fruit);
//   };

//   return (
//     <div style={styles.container}>
//       <h2>React – Parent / Child / Sibling Communication</h2>

//       {/* Parent → Child */}
//       <FruitList fruits={fruits} onSelectFruit={handleSelectFruit} />

//       <div style={styles.row}>
//         {/* Child → Parent */}
//         <Sender onAddFruit={addFruit} />

//         {/* Sibling → Sibling */}
//         <SelectedFruit fruit={selectedFruit} />
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: { padding: "20px", fontFamily: "Arial", textAlign: "center" },
//   row: { display: "flex", justifyContent: "center" },
// };

// Question : 20

// import React from "react";
// import RestaurantForm from "./components/RestaurantForm";

// export default function App() {
//   return (
//     <div>
//       <RestaurantForm />
//     </div>
//   );
// }

// Question : 17

import React, { useState, useEffect } from "react";
import LoadingComponent from "./components/LoadingComponent";
import ErrorComponent from "./components/ErrorComponent";
import ProductComponent from "./components/ProductComponent";

export default function App() {
  const [status, setStatus] = useState("loading"); // "loading" | "error" | "success"
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const success = true; // change to false to simulate error
      success
        ? (() => {
          setProduct({
            name: "Sony Bravia TV",
            brand: "Sony",
            price: 65000,
            category: "TV",
            warranty: 2,
            availability: true
          });
          setStatus("success");
        })()
        : setStatus("error");
    }, 2000);
  }, []);

  return (
    <div style={styles.container}>
      <h1>Lab Question: Conditional Rendering with Multiple Components</h1>
      {status === "loading"
        ? <LoadingComponent />
        : status === "error"
          ? <ErrorComponent />
          : <ProductComponent product={product} />}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
    textAlign: "center",
  },
};


