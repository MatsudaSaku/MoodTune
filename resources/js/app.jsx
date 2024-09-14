import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import RecommendList from "./components/RecommendList";
import { Journaling } from "./components/Journaling";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import SpotifyLogin from "./components/SpotifyLogin";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layouts/Layout";
import "../css/global.css";

function App() {
    const location = useLocation();
    const shouldHideLayout = location.pathname === "/";

    return (
        <Routes>
            <Route path="/" element={<SpotifyLogin />} />
            <Route path="/Top" element={<Journaling />} />
            <Route path="/recommend" element={<RecommendList />} />
        </Routes>
    );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    <ThemeProvider>
        <Router>
            <App />
        </Router>
    </ThemeProvider>
);
