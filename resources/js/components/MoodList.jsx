import { useState } from "react";
import styles from "../../css/app.module.css";

export function MoodButton({
    defaultClass,
    selectedClass,
    label,
    isSelected,
    onClick,
}) {
    return (
        <button
            className={`${isSelected ? selectedClass : defaultClass} ${
                styles.buttonStyle
            }`}
            onClick={() => onClick(label)}
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

export function MoodList({ onMoodSelect, selectedMood }) {
    return (
        <div className={styles.moodListWrapper}>
            <MoodButton
                onClick={onMoodSelect}
                isSelected={selectedMood === "元気"}
                defaultClass={styles.moodListYellow}
                selectedClass={styles.selectedMoodListYellow}
                label="元気"
            />
            <MoodButton
                onClick={onMoodSelect}
                isSelected={selectedMood === "おだやか"}
                defaultClass={styles.moodListBlue}
                selectedClass={styles.selectedMoodListBlue}
                label="おだやか"
            />
            <MoodButton
                onClick={onMoodSelect}
                isSelected={selectedMood === "うれしい"}
                defaultClass={styles.moodListPink}
                selectedClass={styles.selectedMoodListPink}
                label="うれしい"
            />
            <MoodButton
                onClick={onMoodSelect}
                isSelected={selectedMood === "しみじみ"}
                defaultClass={styles.moodListGreen}
                selectedClass={styles.selectedMoodListGreen}
                label="しみじみ"
            />
            <MoodButton
                onClick={onMoodSelect}
                isSelected={selectedMood === "ノスタルジック"}
                defaultClass={styles.moodListPurple}
                selectedClass={styles.selectedMoodListPurple}
                label="ノスタルジック"
            />
            <MoodButton
                onClick={onMoodSelect}
                isSelected={selectedMood === "前向き"}
                defaultClass={styles.moodListOrange}
                selectedClass={styles.selectedMoodListOrange}
                label="前向き"
            />
            <MoodButton
                onClick={onMoodSelect}
                isSelected={selectedMood === "泣ける"}
                defaultClass={styles.moodListPink}
                selectedClass={styles.selectedMoodListPink}
                label="泣ける"
            />
            <MoodButton
                onClick={onMoodSelect}
                isSelected={selectedMood === "ワクワク"}
                defaultClass={styles.moodListOrange}
                selectedClass={styles.selectedMoodListOrange}
                label="ワクワク"
            />
            <MoodButton
                onClick={onMoodSelect}
                isSelected={selectedMood === "落ち着く"}
                defaultClass={styles.moodListBlue}
                selectedClass={styles.selectedMoodListBlue}
                label="落ち着く"
            />
            <MoodButton
                onClick={onMoodSelect}
                isSelected={selectedMood === "ダンス"}
                defaultClass={styles.moodListOrange}
                selectedClass={styles.selectedMoodListOrange}
                label="ダンス"
            />
        </div>
    );
}

