import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS for styling

/****************************************************
 * MovieForm (React Class Component)
 * -----------------------------------------------
 * - A complete movie form system built with React class components
 * - Captures multiple fields: title, director, year, genre, rating, description, streaming platforms
 * - Displays movies in a Bootstrap-styled table after submission
 * - Demonstrates ALL class component lifecycle methods
 * - Includes console.log() inside each lifecycle hook so you can track the flow
 ****************************************************/
class MovieForm extends React.Component {
    // 1) constructor(): The very first method that runs when component is created.
    //    - Used to initialize state and bind methods.
    constructor(props) {
        super(props); // always call parent constructor first
        console.log("constructor executed");

        // Initialize component state:
        // Each key here represents one piece of "memory" for this component.
        this.state = {
            title: "", // movie title text input
            director: "", // director name text input
            year: "", // release year (number input)
            genre: "Action", // default dropdown value
            rating: "", // radio button selection (1-5)
            description: "A story of a hero's journey", // textarea default text
            platforms: {
                netflix: false, // checkbox
                amazon: false,  // checkbox
                disney: false,  // checkbox
                others: false,  // checkbox
            },
            movies: [], // array to store all submitted movies
        };
    }

    // 2) getDerivedStateFromProps(): Static lifecycle method.
    // Runs before render when props/state changes. Rarely used but included here for demonstration.
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("getDerivedStateFromProps executed");
        return null; // we are not updating state from props here
    }

    // 3) componentDidMount(): Runs once after first render.
    // Perfect for fetching data, timers, subscriptions (side-effects).
    componentDidMount() {
        console.log("componentDidMount executed");
    }

    // 4) shouldComponentUpdate(): Called before every re-render.
    // Return false to prevent render. Here we always return true for simplicity.
    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate executed");
        return true; // allow re-render always
    }

    // 5) getSnapshotBeforeUpdate(): Called right before DOM updates.
    // Often used to capture info like scroll position before changes.
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("getSnapshotBeforeUpdate executed");
        // Example: store number of movies before update
        return { previousMovieCount: prevState.movies.length };
    }

    // 6) componentDidUpdate(): Called immediately after update is flushed to DOM.
    // Receives snapshot returned from getSnapshotBeforeUpdate.
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate executed", snapshot);
    }

    // 7) componentWillUnmount(): Runs before component is removed.
    // Useful for cleanup (timers, subscriptions, event listeners).
    componentWillUnmount() {
        console.log("componentWillUnmount executed");
    }

    /****************************************************
     * FORM HANDLER METHODS
     ****************************************************/

    // Handle text, number, and select inputs
    // Uses ES6 destructuring to grab "name" and "value" directly from the event target
    handleBasicChange = (e) => {
        const { name, value } = e.target;
        // [name]: value -> Computed Property Name in JS.
        // This dynamically updates whichever field matches the input's "name".
        this.setState({ [name]: value });
    };

    // Handle rating radio buttons
    handleRatingChange = (e) => {
        this.setState({ rating: e.target.value });
    };

    // Handle checkbox (streaming platforms)
    handlePlatformChange = (e) => {
        const { name, checked } = e.target;
        // Use functional setState to correctly merge with old state
        this.setState((prev) => ({
            platforms: { ...prev.platforms, [name]: checked },
            // ...prev.platforms -> spread operator ensures we keep old values
        }));
    };

    // Handle form submission
    handleSubmit = (e) => {
        e.preventDefault(); // prevent browser refresh (default HTML form behavior)

        // Extract current form values from state
        const { title, director, year, genre, rating, description, platforms } =
            this.state;

        // Simple validation
        if (!title.trim()) {
            alert("Please enter a movie title before adding.");
            return;
        }

        // Map internal checkbox keys to user-friendly labels
        const platformLabels = {
            netflix: "Netflix",
            amazon: "Amazon Prime",
            disney: "Disney+",
            others: "Others",
        };

        // Convert selected platform booleans into a readable array of strings
        // Object.entries -> turns {netflix: true, amazon: false} into [["netflix", true], ["amazon", false]]
        // filter -> keep only those with true
        // map -> replace key with proper label
        const selectedPlatforms = Object.entries(platforms)
            .filter(([, isSelected]) => isSelected)
            .map(([key]) => platformLabels[key]);

        // New movie object with all fields
        const newMovie = {
            title,
            director,
            year,
            genre,
            rating,
            description,
            platforms: selectedPlatforms,
        };

        // Add new movie to list + reset form fields
        this.setState((prev) => ({
            movies: [...prev.movies, newMovie], // spread operator to append
            title: "",
            director: "",
            year: "",
            genre: "Action",
            rating: "",
            description: "",
            platforms: { netflix: false, amazon: false, disney: false, others: false },
        }));
    };

    /****************************************************
     * RENDER METHOD
     * - render() is called automatically whenever state/props change
     * - Returns JSX (which React turns into DOM elements)
     ****************************************************/
    render() {
        console.log("render executed");

        // Destructure state for easier usage inside JSX
        const {
            title,
            director,
            year,
            genre,
            rating,
            description,
            platforms,
            movies,
        } = this.state;

        return (
            <div className="container my-4">
                {/* ---------------- MOVIE FORM ---------------- */}
                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <h3 className="card-title mb-4">Add Movie</h3>

                        {/* Form start */}
                        <form onSubmit={this.handleSubmit}>
                            {/* Movie Title Input */}
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">
                                    Movie Title
                                </label>
                                <input
                                    id="title"
                                    name="title" // maps to this.state.title
                                    type="text"
                                    className="form-control"
                                    value={title}
                                    onChange={this.handleBasicChange}
                                    placeholder="Enter movie title"
                                />
                            </div>

                            {/* Director Input */}
                            <div className="mb-3">
                                <label htmlFor="director" className="form-label">
                                    Director
                                </label>
                                <input
                                    id="director"
                                    name="director"
                                    type="text"
                                    className="form-control"
                                    value={director}
                                    onChange={this.handleBasicChange}
                                    placeholder="Enter director name"
                                />
                            </div>

                            {/* Release Year Input */}
                            <div className="mb-3">
                                <label htmlFor="year" className="form-label">
                                    Release Year
                                </label>
                                <input
                                    id="year"
                                    name="year"
                                    type="number"
                                    className="form-control"
                                    value={year}
                                    onChange={this.handleBasicChange}
                                    placeholder="e.g. 2023"
                                />
                            </div>

                            {/* Genre Dropdown */}
                            <div className="mb-3">
                                <label htmlFor="genre" className="form-label">
                                    Genre
                                </label>
                                <select
                                    id="genre"
                                    name="genre"
                                    className="form-select"
                                    value={genre}
                                    onChange={this.handleBasicChange}
                                >
                                    <option>Action</option>
                                    <option>Comedy</option>
                                    <option>Drama</option>
                                    <option>Sci-Fi</option>
                                    <option>Horror</option>
                                </select>
                            </div>

                            {/* Rating Radio Buttons */}
                            <div className="mb-3">
                                <label className="form-label d-block">Rating</label>
                                {/* Loop through numbers 1–5 */}
                                {["1", "2", "3", "4", "5"].map((num) => (
                                    <div className="form-check form-check-inline" key={num}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id={`rating-${num}`}
                                            name="rating"
                                            value={num}
                                            checked={rating === num}
                                            onChange={this.handleRatingChange}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={`rating-${num}`}
                                        >
                                            {num}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            {/* Description Textarea */}
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="form-control"
                                    rows="3"
                                    value={description}
                                    onChange={this.handleBasicChange}
                                    placeholder="Brief description of the movie"
                                />
                            </div>

                            {/* Streaming Platforms Checkboxes */}
                            <div className="mb-4">
                                <label className="form-label d-block">
                                    Available on Streaming Platforms
                                </label>

                                {/* Netflix */}
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="platform-netflix"
                                        name="netflix"
                                        checked={platforms.netflix}
                                        onChange={this.handlePlatformChange}
                                    />
                                    <label className="form-check-label" htmlFor="platform-netflix">
                                        Netflix
                                    </label>
                                </div>

                                {/* Amazon Prime */}
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="platform-amazon"
                                        name="amazon"
                                        checked={platforms.amazon}
                                        onChange={this.handlePlatformChange}
                                    />
                                    <label className="form-check-label" htmlFor="platform-amazon">
                                        Amazon Prime
                                    </label>
                                </div>

                                {/* Disney+ */}
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="platform-disney"
                                        name="disney"
                                        checked={platforms.disney}
                                        onChange={this.handlePlatformChange}
                                    />
                                    <label className="form-check-label" htmlFor="platform-disney">
                                        Disney+
                                    </label>
                                </div>

                                {/* Others */}
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="platform-others"
                                        name="others"
                                        checked={platforms.others}
                                        onChange={this.handlePlatformChange}
                                    />
                                    <label className="form-check-label" htmlFor="platform-others">
                                        Others
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="btn btn-primary">
                                Add Movie
                            </button>
                        </form>
                    </div>
                </div>

                {/* ---------------- MOVIE TABLE ---------------- */}
                <div className="table-responsive">
                    <table className="table table-striped align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Title</th>
                                <th>Director</th>
                                <th>Release Year</th>
                                <th>Genre</th>
                                <th>Rating</th>
                                <th>Available on Streaming Platforms</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* If no movies yet, show a message */}
                            {movies.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-muted">
                                        No movies added yet.
                                    </td>
                                </tr>
                            ) : (
                                // Map through movies array -> dynamically create table rows
                                movies.map((m, idx) => (
                                    <tr key={idx}>
                                        <td>{m.title}</td>
                                        <td>{m.director}</td>
                                        <td>{m.year}</td>
                                        <td>{m.genre}</td>
                                        <td>{m.rating}</td>
                                        <td>{m.platforms && m.platforms.join(", ")}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Note about lifecycle logs */}
                <p className="text-muted mt-3" style={{ whiteSpace: "pre-line" }}>
                    In console we can see lifecycle logs for: constructor →
                    getDerivedStateFromProps → render → componentDidMount →
                    shouldComponentUpdate → getSnapshotBeforeUpdate → componentDidUpdate →
                    componentWillUnmount.
                </p>
            </div>
        );
    }
}

export default MovieForm;
