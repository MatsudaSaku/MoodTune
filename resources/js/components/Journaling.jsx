import React from "react";
import Layout from "./Layout";
import styles from "../../css/journaling.module.css";
import { useState, useEffect } from "react";
import "../../css/modal.css";
import "../../css/loading_Modal.css";
import RecommendList from "./RecommendList";
import { useNavigate } from "react-router-dom";

export function Journaling() {
    const [messageInput, setMessageInput] = useState("");
    const [conversationHistory, setConversationHistory] = useState([]);
    const [chatDisplay, setChatDisplay] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [placeholder_Text, setPlaceholder_Text] =
        useState("気持ちのままに書いてみてください");
    const [placeholder_Title, setPlaceholder_Title] = useState("No Title");
    const [backgroundImage, setBackgroundImage] = useState("");
    const [animationClass, setAnimationClass] = useState("");
    const [emotionScores, setEmotionScores] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [selectedMood, setSelectedMood] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [showRecommend, setShowRecommend] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        sendJournalingMessage();
    }, []);

    useEffect(() => {
        console.log("Updated conversation history:", conversationHistory);
    }, [conversationHistory]);

    useEffect(() => {
        if (backgroundImage) {
            setAnimationClass("fadeInUpAnimation");
            const timer = setTimeout(() => {
                setAnimationClass("");
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [backgroundImage]);

    const handleBackgroundChange = (event) => {
        setBackgroundImage(event.target.value);
    };

    const parseEmotionScores = (responseText) => {
        const regex = /興奮: (\d+) 不安: (\d+) 悲しみ: (\d+) 楽しみ: (\d+)/;
        const match = responseText.match(regex);
        if (match) {
            return {
                excitement: parseInt(match[1], 10),
                anxiety: parseInt(match[2], 10),
                sadness: parseInt(match[3], 10),
                joy: parseInt(match[4], 10),
            };
        }
        return null;
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEmotionScores(null);
        resetScores();
        setModalMessage("");
        setPlaceholder_Text("気持ちのままに書いてみてください");
        setPlaceholder_Title("No Title");
    };

    const handleCloseModal2 = () => {
        setIsModalOpen(false);
        setEmotionScores(null);
        resetScores();
        setModalMessage("");
        setPlaceholder_Text("今の気持ちすべて書き出せましたか？");
        setPlaceholder_Title("No Title");
    };

    const Modal = ({ isOpen, onClose, scores, message }) => {
        if (!isOpen) return null;

        if (!scores || message) {
            return (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={onClose}>
                            &times;
                        </span>
                        <h2>申し訳ありません！</h2>
                        <p>感情を読み取れませんでした…</p>
                    </div>
                </div>
            );
        }

        const mood = scores.anxiety - scores.excitement;
        if (mood <= -80) {
            setSelectedMood("うれしい");
        } else {
            setSelectedMood("元気");
        }

        const genres = scores.sadness - scores.joy;

        if (genres <= -80) {
            setSelectedGenres("rock");
        } else {
            setSelectedGenres("pop");
        }

        return (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleCloseModal2}>
                        &times;
                    </span>
                    <h2>あなたの気分は…</h2>
                    <p>興奮: {scores.excitement}</p>
                    <p>不安: {scores.anxiety}</p>
                    <p>悲しみ: {scores.sadness}</p>
                    <p>楽しみ: {scores.joy}</p>
                    <h3>という解析をしました！</h3>
                    <button className="recommend" onClick={handleClick}>
                        今のあなたにおススメの音楽は　「{selectedMood}、
                        {selectedGenres}
                        　」です。
                    </button>
                </div>
            </div>
        );
    };

    const handleClick = () => {
        setIsModalOpen(false);
        setShowRecommend(false);
        /*navigate("/recommend", {
            state: { mood: selectedMood, genres: selectedGenres },
        });*/
    };

    const LoadingModal = ({ isOpen }) => {
        if (!isOpen) return null;

        return (
            <div className="modal_loading">
                <div className="modal_content_loading">
                    <div className="loader"></div>
                    <h2>解析中...</h2>
                </div>
            </div>
        );
    };

    const updateChatDisplay = (message) => {
        const scores = parseEmotionScores(message);
        setEmotionScores(scores);
        setIsModalOpen(true);

        /*const messageElements = message
            .split(/(?<=[。？！])/)
            .map((line, index) => (
                <React.Fragment key={index}>
                    <div className="fadeInUp">{line}</div>
                    <br />
                </React.Fragment>
            ));

        setChatDisplay([...chatDisplay, { message: messageElements }]);*/
    };

    const sendJournalingMessage = async () => {
        setIsLoading(true);
        try {
            const initialSystemMessage = {
                role: "system",
                content:
                    "ユーザーの言葉を解析して、四つの感情である、興奮、不安、悲しみ、楽しみ、を四つ全部で100としてそれぞれの現在の感情を数値で表してください。書き方は、　興奮: 25 不安: 25 悲しみ: 25 楽しみ: 25　とだけ書いてください。短ければERRORとだけ表示してください。",
            };
            const updatedHistory = [
                ...conversationHistory,
                initialSystemMessage,
            ];
            setConversationHistory(updatedHistory);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessageToAPI = async (messages) => {
        setIsLoading(true);
        try {
            const validMessages = messages.filter(
                (msg) => msg.content !== null && msg.content !== undefined
            );

            const response = await fetch("/api/journaling", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ messages: validMessages }),
            });

            if (!response.ok) {
                console.error("Response Error:", await response.text());
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            const newMessage = {
                role: "assistant",
                content: data.choices[0].message.content,
            };
            const updatedHistory = [...messages, newMessage];

            setConversationHistory(updatedHistory);

            updateChatDisplay(newMessage.content);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (text.trim() === "") {
            setModalMessage("申し訳ありません！解析できなかったようです…");
            setIsModalOpen(true);
            console.error("User input is empty.");
            return;
        }
        const userMessage = { role: "user", content: text };
        const updatedHistory = [...conversationHistory, userMessage];
        setConversationHistory(updatedHistory);
        await sendMessageToAPI(updatedHistory);
        setText("");
        setTitle("");
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "title") {
            setTitle(value);
        } else if (name === "text") {
            setText(value);
        }
    };

    const handleFocus_text = () => {
        setPlaceholder_Text("");
    };

    const handleFocus_title = () => {
        setPlaceholder_Title("");
    };

    const handleBlur = () => {
        if (text === "") {
            setPlaceholder_Text("気持ちのままに書いてみてください");
        }
        if (title === "") {
            setPlaceholder_Title("No Title");
        }
    };

    const resetScores = () => {
        setEmotionScores(null);
    };

    return (
        <Layout>
            {showRecommend ? (
                <div
                    className={`${styles.journaling_container} ${animationClass}`}
                    style={{
                        backgroundImage: backgroundImage,
                        backgroundSize: "cover",
                    }}
                >
                    <div className="background-overlay"></div>
                    <div className={styles.form_container}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={handleInputChange}
                                placeholder={placeholder_Title}
                                className={styles.journaling_title}
                                onFocus={handleFocus_title}
                                onBlur={handleBlur}
                            />
                            <textarea
                                type="text"
                                name="text"
                                value={text}
                                onChange={handleInputChange}
                                placeholder={placeholder_Text}
                                className={styles.journaling_text}
                                onFocus={handleFocus_text}
                                onBlur={handleBlur}
                            />
                            <div className={styles.button_container}>
                                <button
                                    type="submit"
                                    className={styles.save_button}
                                >
                                    保存して解析
                                </button>
                                <button
                                    type="submit"
                                    className={styles.analysis_button}
                                >
                                    気分解析のみ
                                </button>
                            </div>
                        </form>
                        {chatDisplay.map((item, index) => (
                            <div
                                className={styles.api_message}
                                key={index}
                                style={{
                                    marginBottom: "10px",
                                    padding: "5px",
                                    borderBottom: "1px solid #ccc",
                                }}
                            >
                                {item.message}
                            </div>
                        ))}
                    </div>
                    <button className={styles.history}>履歴</button>
                    <select
                        className={styles.select_background}
                        onChange={handleBackgroundChange}
                    >
                        <option value="">シンプル</option>
                        <option value="url('/background1.jpg')">opera</option>
                        <option value="url('/background2.jpg')">空</option>
                    </select>
                    <Modal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        scores={emotionScores}
                        message={modalMessage}
                    />
                    <LoadingModal isOpen={isLoading} />
                </div>
            ) : (
                <RecommendList mood={selectedMood} genres={selectedGenres} />
            )}
        </Layout>
    );
}
