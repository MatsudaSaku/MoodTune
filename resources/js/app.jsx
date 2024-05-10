import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { GenreButton, GenreList } from "./components/GenreList";
import { MoodList } from "./components/MoodList";
import RecommendList from "./components/RecommendList";
import styles from "../css/app.module.css";
import Layout from "./components/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import { MoodGenreList } from "./components/MoodGenreList";
import Chat from "./components/Chat";
import Sample from "./components/Sample";

function App() {
    const [selectedMood, setSelectedMood] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [showResults, setShowResults] = useState(false);
    let genresQueryParam = "";

    const handleDecisionClick = () => {
        if (selectedMood && selectedGenres.length > 0) {
            genresQueryParam = selectedGenres.join(",");
            setShowResults(true);
        }
    };

    if (showResults) {
        return (
            <Layout>
                <RecommendList mood={selectedMood} genres={selectedGenres} />
            </Layout>
        );
    }

    return (
        <Layout>
            <div className={styles.area}>
                <div className={styles.home}>
                    <h2 className={styles.headline}>
                        なりたい気分を選んでください<small>(※１つ)</small>
                    </h2>
                    <MoodList onMoodSelect={setSelectedMood} />
                    <h2 className={styles.headline}>
                        ジャンルを選んでください<small>(※複数可)</small>
                    </h2>
                    <GenreList
                        onGenreSelect={(genres) => setSelectedGenres(genres)}
                    />
                    <button
                        className={styles.doneButton}
                        onClick={handleDecisionClick}
                    >
                        決定
                    </button>
                </div>
                <ul className={styles.circles}>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </Layout>
    );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    <Router>
        <MoodGenreList />
    </Router>
);
