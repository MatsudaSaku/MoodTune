import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import RecommendList from "./components/RecommendList";
import { Journaling } from "./components/Journaling";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SpotifyLogin from "./components/SpotifyLogin";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<SpotifyLogin />} />
            <Route path="/Top" element={<Journaling />} />
            <Route path="/recommend" element={<RecommendList />} />
        </Routes>
    </Router>
);
