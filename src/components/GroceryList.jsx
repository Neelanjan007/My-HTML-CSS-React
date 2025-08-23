import React, { useEffect, useState } from "react";

/**
 * GroceryList
 * - Displays an unordered list of groceries using map()
 * - Accepts initial items via `items` prop (array of strings)
 * - Each list item has a unique key
 * - Has an input bar to dynamically add groceries
 * - Button below list shows "Groceries Added to Cart!" alert
 */
const GroceryList = ({ items = [] }) => {
  // Convert incoming strings to { id, text } for stable keys
  const toItemObjects = (arr) => arr.map((text, i) => ({ id: `${text}-${i}`, text }));

  const [list, setList] = useState(() => toItemObjects(items));
  const [input, setInput] = useState("");

  // If the prop changes later, re-seed the list
  useEffect(() => {
    setList(toItemObjects(items));
  }, [items]);

  const addItem = () => {
    const text = input.trim();
    if (!text) return;

    // Create a unique id even if the same text is added multiple times
    const baseId = text.toLowerCase().replace(/\s+/g, "-");
    let id = baseId;
    let n = 1;
    const existingIds = new Set(list.map((it) => it.id));
    while (existingIds.has(id)) {
      id = `${baseId}-${n++}`;
    }

    setList((prev) => [...prev, { id, text }]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addItem();
  };

  const handleAddToCart = () => {
    alert("Groceries Added to Cart!");
  };

  // Simple inline styles to avoid extra CSS files
  const styles = {
    wrapper: {
      maxWidth: 700,
      margin: "24px auto",
      padding: "16px",
      fontFamily:
        'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    },
    title: { fontSize: 32, margin: "0 0 12px" },
    addBar: { display: "flex", gap: 8, margin: "0 0 16px" },
    input: { flex: 1, padding: "10px 12px", fontSize: 16, border: "1px solid #ccc", borderRadius: 8 },
    addBtn: { padding: "10px 16px", fontSize: 16, cursor: "pointer", borderRadius: 8 },
    list: { marginLeft: 24, fontSize: 18, lineHeight: 1.5, marginBottom: 16 },
    cartBtn: {
      padding: "10px 16px",
      fontSize: 16,
      cursor: "pointer",
      borderRadius: 8,
      border: "2px solid #bfc5ce",
      background: "#fff",
    },
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>Groceries List:</h1>

      {/* Add bar */}
      <div style={styles.addBar}>
        <input
          style={styles.input}
          type="text"
          placeholder="Add a grocery (e.g., Eggs)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Grocery name"
        />
        <button type="button" style={styles.addBtn} onClick={addItem} disabled={!input.trim()}>
          Add
        </button>
      </div>

      {/* Dynamic list using map() */}
      <ul style={styles.list}>
        {list.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>

      {/* Alert button */}
      <button type="button" style={styles.cartBtn} onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default GroceryList;
