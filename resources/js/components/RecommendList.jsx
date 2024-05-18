import React, { useState, useEffect } from "react";
import styles from "../../css/recommendList.module.css";
import Color, { Palette } from "color-thief-react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "./Layout";

export default function RecommendList({ mood, genres }) {
    const [tracks, setTracks] = useState([]);
    const [activeTrack, setActiveTrack] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalBackground, setModalBackground] = useState(null);
    const [gradientAngle, setGradientAngle] = useState(45);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    //const { mood = "", genres = [] } = location.state || {};

    const accessToken =
        "BQDj9KVhIOzTiLCa31r1TmNUhtOcgU-vgAx1cNcJQiW9zmU_eyQ0K8izvOHIimpZ9FYkHfcuCRhYzn3qeR5z2kYDM_QKkQvzx_BDGPf9V2mfe72gDID5vuYKpKY6YQDttuaY6T6G9l5D-MtkJEKiffrvGqBYfYaJjBiAlFSKuw8wQQI8JL0Gh7GA0TX5SnvYIqyYNRxfJWHwF_Oz0bq4q6tnrP4xNbv1VJKJNagimmy1J-XaOVgiNIRiGjYMJVPz4W8yGFinon44PSN9b2ij6pcE";

    let navigate = useNavigate();

    /*useEffect(() => {
        if (!location.state) {
            // location.state が存在しない場合（リロード時など）、トップページにリダイレクト
            navigate("/", { replace: true });
        }
    }, [location, navigate]);*/

    let url = `https://api.spotify.com/v1/recommendations?limit=12&seed_genres=${genres}`;

    if (genres.includes("全ジャンル")) {
        url = `https://api.spotify.com/v1/recommendations?limit=12&seed_genres=country,anime,pop,jazz,rock`;
    }

    switch (mood) {
        case "元気":
            url += `&min_tempo=150&max_tempo=200&min_energy=0.7&max_energy=1.0`;
            break;
        case "しみじみ":
            url += `&min_tempo=60&max_tempo=90&min_energy=0&max_energy=0.4`;
            break;
        case "おだやか":
            url += `&min_tempo=60&max_tempo=90&min_energy=0&max_energy=0.4&max_loudness=-10`;
            break;
        case "うれしい":
            url += `&min_valence=0.7&mode=1`;
            break;
        case "ノスタルジック":
            url += `&mode=0`;
            break;
        case "前向き":
            url += `&min_valence=0.7&mode=1&min_energy=0.6`;
            break;
        case "泣ける":
            url += `&max_valence=0.4&mode=0`;
            break;
        case "ワクワク":
            url += `&min_valence=0.7&mode=1`;
            break;
        case "落ち着く":
            url += `&max_tempo=90&max_energy=0.4&max_loudness=-10`;
            break;
        case "ダンス":
            url += `&danceability=1.0`;
            break;
    }

    useEffect(() => {
        if (accessToken) {
            const fetchTracks = async () => {
                setIsLoading(true);

                try {
                    const response = await fetch(url, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    const data = await response.json();
                    setTracks(data.tracks);

                    setIsLoading(false);
                } catch (error) {
                    console.error("Error fetching tracks", error);
                }
            };

            fetchTracks();
        }
    }, [accessToken, url]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setGradientAngle((prevAngle) => (prevAngle + 2) % 360);
        }, 100);

        return () => clearInterval(intervalId);
    }, []);

    const openModal = (track) => {
        setActiveTrack(track);
        setShowModal(true);
        setModalBackground(null);
    };

    if (isLoading) {
        return (
            <div className={styles.load}>
                <span className={styles.spinnerLoader}></span>
            </div>
        );
    }

    return (
        <div className={styles.recommend}>
            <h2 className={styles.heading}>レコメンド一覧</h2>
            <ul className={styles.recommendList}>
                {tracks.map((track) => (
                    <li key={track.id} onClick={() => openModal(track)}>
                        <img src={track.album.images[0].url} alt={track.name} />
                        <div>
                            <h2>{track.name}</h2>
                            <p>
                                {track.artists
                                    .map((artist) => artist.name)
                                    .join(", ")}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
            <div className={styles.buttonLinks}>
                <button onClick={() => navigate(-1)}>戻る</button>

                <button onClick={() => window.location.reload()}>更新</button>
            </div>
            {showModal && (
                <>
                    <div
                        className={styles.modal}
                        style={{
                            background: modalBackground,
                        }}
                    >
                        <iframe
                            src={`https://open.spotify.com/embed/track/${activeTrack?.id}`}
                            width="300"
                            height="380"
                            frameBorder="0"
                            allowtransparency="true"
                            allow="encrypted-media"
                        ></iframe>
                        <button
                            className={styles.closeButton}
                            onClick={() => setShowModal(false)}
                        >
                            閉じる
                        </button>
                    </div>
                    <Palette
                        src={activeTrack?.album.images[0].url}
                        crossOrigin="anonymous"
                        format="hex"
                        colorCount={3}
                    >
                        {({ data, loading }) => {
                            if (!loading && data) {
                                const gradient = `linear-gradient(${gradientAngle}deg, ${data.join(
                                    ","
                                )})`;

                                setModalBackground(gradient);
                            }
                            return null;
                        }}
                    </Palette>
                </>
            )}
        </div>
    );
}
