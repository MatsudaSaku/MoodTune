import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { GenreButton, GenreList } from "./components/GenreList";
import { MoodList } from "./components/MoodList";
import RecommendList from "./components/RecommendList";
import styles from "../css/app.module.css";
import Layout from "./components/Layout";
import { MoodGenreList } from "./components/MoodGenreList";
import Chat from "./components/Chat";
import Sample from "./components/Sample";
import { Journaling } from "./components/Journaling";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/*const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    <Router>
        <Journaling />
    </Router>
);*/

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<Journaling />} />
            <Route path="/recommend" element={<RecommendList />} />
        </Routes>
    </Router>
);
