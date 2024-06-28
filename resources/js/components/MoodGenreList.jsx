import React, { useState } from "react";
import { GenreButton, GenreList } from "./GenreList";
import { MoodList } from "./MoodList";
import RecommendList from "./RecommendList";
import styles from "../../css/app.module.css";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

export function MoodGenreList() {
    const [selectedMood, setSelectedMood] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();

    let genresQueryParam = "";

    const handleDecisionClick = () => {
        if (selectedMood && selectedGenres.length > 0) {
            genresQueryParam = selectedGenres.join(",");
            setShowResults(true);
        }
    };

    const handleMoodSelect = (mood) => {
        setSelectedMood(mood);
    };

    const handleGenreSelect = (genre) => {
        setSelectedGenres((prevSelectedGenres) => {
            let updatedGenres = [...prevSelectedGenres];
            if (updatedGenres.includes(genre)) {
                updatedGenres = updatedGenres.filter((g) => g !== genre);
            } else {
                if (updatedGenres.length >= 5) {
                    updatedGenres.shift();
                }
                updatedGenres.push(genre);
            }
            return updatedGenres;
        });
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
                    <MoodList
                        onMoodSelect={handleMoodSelect}
                        selectedMood={selectedMood}
                    />
                    <h2 className={styles.headline}>
                        ジャンルを選んでください<small>(※５つまで)</small>
                    </h2>
                    <GenreList
                        onGenreSelect={handleGenreSelect}
                        selectedGenres={selectedGenres}
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

