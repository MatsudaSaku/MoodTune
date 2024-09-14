import React from "react";
import styles from "../../../css/app.module.css";
import { useTheme } from "../../context/ThemeContext";
import lightThemeImg from "../../../../public//theme-light.png";
import skyThemeImg from "../../../../public//theme-sky.png";
import darkThemeImg from "../../../../public//theme-dark.png";
import whiteThemeImg from "../../../../public//theme-white.png";
import greenThemeImg from "../../../../public//theme-green.png";
import peachThemeImg from "../../../../public//theme-peach.png";

export default function ImageGrid() {
    const { changeTheme } = useTheme();

    const handleLightClick = () => {
        changeTheme("light");
    };

    const handleDarkClick = () => {
        changeTheme("dark");
    };

    const handleWhiteClick = () => {
        changeTheme("white");
    };

    const handleBlueClick = () => {
        changeTheme("blue");
    };

    const handleGreenClick = () => {
        changeTheme("green");
    };

    const handlePeachClick = () => {
        changeTheme("peach");
    };

    return (
        <div className={styles.imageGrid}>
            <img
                src={lightThemeImg}
                alt="Light Theme"
                onClick={handleLightClick}
            />
            <img src={skyThemeImg} alt="Sky Theme" onClick={handleBlueClick} />
            <img
                src={greenThemeImg}
                alt="Green Theme"
                onClick={handleGreenClick}
            />
            <img
                src={peachThemeImg}
                alt="peach Theme"
                onClick={handlePeachClick}
            />
            <img
                src={whiteThemeImg}
                alt="White Theme"
                onClick={handleWhiteClick}
            />
            <img
                src={darkThemeImg}
                alt="Dark Theme"
                onClick={handleDarkClick}
            />
        </div>
    );
}
