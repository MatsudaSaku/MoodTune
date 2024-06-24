import React, { useState, useEffect } from "react";
import styles from "../../css/app.module.css";

export function GenreButton({
    defaultClass,
    selectedClass,
    label,
    value,
    onClick,
}) {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        setIsSelected(!isSelected);
        onClick(value);
    };

    return (
        <button
            className={`${isSelected ? selectedClass : defaultClass} ${
                styles.buttonStyle
            }`}
            onClick={handleClick}
        >
            <span>{label}</span>
            <img
                src={isSelected ? "/done.svg" : "/plus1.svg"}
                width={20}
                height={20}
                alt="Icon"
                className="plusIcon"
            />
        </button>
    );
}

export function GenreList({ onGenreSelect }) {
    const [selectedGenres, setSelectedGenres] = useState("");

    const handleGenreSelect = (genre) => {
        setSelectedGenres((prevSelectedGenres) => {
            if (prevSelectedGenres.includes(genre)) {
                return prevSelectedGenres.filter((g) => g !== genre);
            } else {
                return [...prevSelectedGenres, genre];
            }
        });
    };

    useEffect(() => {
        onGenreSelect(selectedGenres);
    }, [selectedGenres]);

    return (
        <div className={styles.moodListWrapper}>
            <GenreButton
                onClick={handleGenreSelect}
                isSelected={selectedGenres.includes("pop")}
                defaultClass={styles.moodListYellow}
                selectedClass={styles.selectedMoodListYellow}
                label="pop"
                value="pop"
            />
            <GenreButton
                onClick={handleGenreSelect}
                isSelected={selectedGenres.includes("rock")}
                defaultClass={styles.moodListOrange}
                selectedClass={styles.selectedMoodListOrange}
                label="rock"
                value="rock"
            />
            <GenreButton
                onClick={handleGenreSelect}
                isSelected={selectedGenres.includes("jazz")}
                defaultClass={styles.moodListBlue}
                selectedClass={styles.selectedMoodListBlue}
                label="jazz"
                value="jazz"
            />
            <GenreButton
                onClick={handleGenreSelect}
                isSelected={selectedGenres.includes("classical")}
                defaultClass={styles.moodListPurple}
                selectedClass={styles.selectedMoodListPurple}
                label="classical"
                value="classical"
            />
            <GenreButton
                onClick={handleGenreSelect}
                isSelected={selectedGenres.includes("romance")}
                defaultClass={styles.moodListPink}
                selectedClass={styles.selectedMoodListPink}
                label="romance"
                value="romance"
            />
            <GenreButton
                onClick={handleGenreSelect}
                isSelected={selectedGenres.includes("world-music")}
                defaultClass={styles.moodListGreen}
                selectedClass={styles.selectedMoodListGreen}
                label="world-music"
                value="world-music"
            />
            <GenreButton
                onClick={handleGenreSelect}
                isSelected={selectedGenres.includes("movies")}
                defaultClass={styles.moodListOrange}
                selectedClass={styles.selectedMoodListOrange}
                label="movies"
                value="movies"
            />
            <GenreButton
                onClick={handleGenreSelect}
                isSelected={selectedGenres.includes("country")}
                defaultClass={styles.moodListYellow}
                selectedClass={styles.selectedMoodListYellow}
                label="country"
                value="country"
            />
            <GenreButton
                onClick={handleGenreSelect}
                isSelected={selectedGenres.includes("dance")}
                defaultClass={styles.moodListYellow}
                selectedClass={styles.selectedMoodListYellow}
                label="dance"
                value="dance"
            />
            <GenreButton
                onClick={handleGenreSelect}
                isSelected={selectedGenres.includes("punk")}
                defaultClass={styles.moodListOrange}
                selectedClass={styles.selectedMoodListOrange}
                label="punk"
                value="punk"
            />
            <GenreButton
                onClick={handleGenreSelect}
                isSelected={selectedGenres.includes("summer")}
                defaultClass={styles.moodListGreen}
                selectedClass={styles.selectedMoodListGreen}
                label="summer"
                value="summer"
            />
            <GenreButton
                onClick={handleGenreSelect}
                isSelected={selectedGenres.includes("sleep")}
                defaultClass={styles.moodListPurple}
                selectedClass={styles.selectedMoodListPurple}
                label="sleep"
                value="sleep"
            />
            <GenreButton
                onClick={handleGenreSelect}
                isSelected={selectedGenres.includes("j-pop")}
                defaultClass={styles.moodListYellow}
                selectedClass={styles.selectedMoodListYellow}
                label="j-pop"
                value="j-pop"
            />
            <GenreButton
                onClick={handleGenreSelect}
                isSelected={selectedGenres.includes("k-pop")}
                defaultClass={styles.moodListPurple}
                selectedClass={styles.selectedMoodListPurple}
                label="k-pop"
                value="k-pop"
            />
            <GenreButton
                onClick={handleGenreSelect}
                isSelected={selectedGenres.includes("study")}
                defaultClass={styles.moodListPink}
                selectedClass={styles.selectedMoodListPink}
                label="study"
                value="study"
            />
            <GenreButton
                onClick={handleGenreSelect}
                isSelected={selectedGenres.includes("全ジャンル")}
                defaultClass={styles.moodListPurple}
                selectedClass={styles.selectedMoodListPurple}
                label="全ジャンル"
                value="全ジャンル"
            />
        </div>
    );
}
