import React, { useState, useEffect } from "react";
import { GenreButton, GenreList } from "./MusicList/GenreList";
import { MoodList } from "./MusicList/MoodList";
import RecommendList from "./RecommendList";
import styles from "../../css/app.module.css";
import Layout from "./Layouts/Layout";

export function MoodGenreList() {
    const [selectedMood, setSelectedMood] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [textVisible, setTextVisible] = useState(false);

    let genresQueryParam = "";

    useEffect(() => {
        if (selectedMood || selectedGenres.length > 0) {
            setTextVisible(false);
            setTimeout(() => setTextVisible(true), 200);
        } else {
            setTextVisible(false);
        }
    }, [selectedMood, selectedGenres]);

    const handleDecisionClick = () => {
        if (selectedMood && selectedGenres.length > 0) {
            genresQueryParam = selectedGenres.join(",");
            setShowResults(true);
        } else {
            alert("なりたい気分とジャンルを選択してください。");
            return;
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
                        なりたい気分を選んでください　<small>※１つ</small>
                    </h2>
                    <MoodList
                        onMoodSelect={handleMoodSelect}
                        selectedMood={selectedMood}
                    />
                    <h2 className={styles.headline}>
                        ジャンルを選んでください　<small>※５つまで</small>
                    </h2>
                    <GenreList
                        onGenreSelect={handleGenreSelect}
                        selectedGenres={selectedGenres}
                    />
                    <button
                        className={styles.doneButton}
                        onClick={handleDecisionClick}
                    >
                        <span
                            className={`${styles.decisionText} ${
                                textVisible ? styles.decisionTextAppear : ""
                            }`}
                        >
                            {selectedMood && (
                                <>
                                    <span className={styles.selectedMood}>
                                        {selectedMood}
                                    </span>
                                    <span className={styles.separator}>
                                        {" "}
                                        +{" "}
                                    </span>
                                </>
                            )}
                            {selectedGenres.map((genre, index) => (
                                <React.Fragment key={index}>
                                    <span className={styles.selectedGenre}>
                                        {genre}
                                    </span>
                                    {index < selectedGenres.length - 1 && "   "}
                                </React.Fragment>
                            ))}
                        </span>
                    </button>
                </div>
            </div>
        </Layout>
    );
}
