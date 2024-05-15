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
import { Journaling } from "./components/Journaling";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    <Router>
        <Journaling />
    </Router>
);
