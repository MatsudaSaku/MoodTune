import React from "react";
import Layout from "./Layout";
import styles from "../../css/journaling.module.css";
import { useState, useEffect } from "react";
import "../../css/modal.css";
import "../../css/loading_Modal.css";
import RecommendList from "./RecommendList";
import { useNavigate } from "react-router-dom";

export function Journaling() {
    const [conversationHistory, setConversationHistory] = useState([]);
    const [chatDisplay] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [placeholder_Text, setPlaceholder_Text] =
        useState("気持ちのままに書いてみてください\n\n※例「今日は散歩に行って楽しかったです」");
    const [placeholder_Title, setPlaceholder_Title] = useState("No Title");
    const [backgroundImage, setBackgroundImage] = useState("");
    const [animationClass, setAnimationClass] = useState("");
    const [emotionScores, setEmotionScores] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [selectedMood, setSelectedMood] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [showRecommend, setShowRecommend] = useState(true);
    const [isConversationHistoryUpdated, setIsConversationHistoryUpdated] =
        useState(false);
    const [journalingTitles, setJournalingTitles] = useState([]);
    const [selectedJournalingContent, setSelectedJournalingContent] =
        useState("");
    const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
    const [selectedJournalingTitle, setSelectedJournalingTitle] = useState("");
    const [selectedJournalingCreatedAt, setSelectedJournalingCreatedAt] =
        useState("");
    const [selectedJournalingId, setSelectedJournalingId] = useState(null);

    useEffect(() => {
        if (isConversationHistoryUpdated) {
            sendJournalingMessage();
            setIsConversationHistoryUpdated(false);
        }
    }, [isConversationHistoryUpdated]);

    useEffect(() => {
        sendJournalingMessage();
        const spotifyAccessToken = sessionStorage.getItem(
            "spotify_access_token"
        );
        const laravelToken = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("user_id");

        handleHistoryClick();
    }, []);


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
        const regex =
            /興奮:\s*(\d+)\s*.*?\s*不安:\s*(\d+)\s*.*?\s*悲しみ:\s*(\d+)\s*.*?\s*楽しみ:\s*(\d+)/;
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
        setConversationHistory([]);
        setIsConversationHistoryUpdated(true);
    };

    const handleCloseModal2 = () => {
        setIsModalOpen(false);
        setEmotionScores(null);
        resetScores();
        setModalMessage("");
        setPlaceholder_Text("今の気持ちすべて書き出せましたか？");
        setPlaceholder_Title("No Title");
        setConversationHistory([]);
        setIsConversationHistoryUpdated(true);
    };

    const Modal = ({ isOpen, scores, message }) => {
        if (!isOpen) return null;

        if (!scores || message) {
            return (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>
                            &times;
                        </span>
                        <h2>申し訳ありません！</h2>
                        <p>感情を読み取れませんでした…</p>
                    </div>
                </div>
            );
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

    const LoadingModalHistory = ({ isOpen }) => {
        if (!isOpen) return null;

        return (
            <div className="modal_loading">
                <div className="modal_content_loading">
                    <div className="loader"></div>
                    <h2>ジャーナルを表示します...</h2>
                </div>
            </div>
        );
    };

    const updateChatDisplay = (message) => {
        const scores = parseEmotionScores(message);

        if (!scores) {
            setIsModalOpen(true);
            return;
        }

        setEmotionScores(scores);

        const mood = scores.anxiety - scores.excitement;
        if (mood >= 80) {
            setSelectedMood("落ち着く");
        } else if (mood >= 60) {
            setSelectedMood("ノスタルジック");
        } else if (mood >= 40) {
            setSelectedMood("泣ける");
        } else if (mood >= 20) {
            setSelectedMood("おだやか");
        } else if (mood >= 0) {
            setSelectedMood("しみじみ");
        } else if (mood >= -20) {
            setSelectedMood("前向き");
        } else if (mood >= -40) {
            setSelectedMood("元気");
        } else if (mood >= -60) {
            setSelectedMood("ダンス");
        } else if (mood >= -80) {
            setSelectedMood("ワクワク");
        } else {
            setSelectedMood("うれしい");
        }

        const genres = scores.sadness - scores.joy;

        if (genres >= 80) {
            setSelectedGenres("j-pop,k-pop,happy,comedy");
        } else if (genres >= 60) {
            setSelectedGenres("sleep,movie,soundtracks");
        } else if (genres >= 40) {
            setSelectedGenres("jazz,classical,ambient");
        } else if (genres >= 20) {
            setSelectedGenres("country,anime,chill");
        } else if (genres >= 0) {
            setSelectedGenres("study,folk,emo");
        } else if (genres >= -20) {
            setSelectedGenres("rock,soul,rainy-day");
        } else if (genres >= -40) {
            setSelectedGenres("pop,work-out,romance");
        } else if (genres >= -60) {
            setSelectedGenres("world-music,swedish,tango");
        } else if (genres >= -60) {
            setSelectedGenres("summer,movies,party");
        } else if (genres >= -80) {
            setSelectedGenres("dance,gospel,groove");
        } else {
            setSelectedGenres("romance,punk,party");
        }

        setIsModalOpen(true);
    };

    const sendJournalingMessage = async () => {
        setIsLoading(true);
        try {
            const initialSystemMessage = {
                role: "system",
                content:
                    //"ユーザーの言葉を解析して、四つの感情である、興奮、不安、悲しみ、楽しみ、を四つ全部で100としてそれぞれの現在の感情を数値で表してください。書き方は、　興奮: 25 不安: 25 悲しみ: 25 楽しみ: 25　とだけ書いてください。短ければERRORとだけ表示してください。",
                    "ユーザーの言葉を解析して、四つの感情である、興奮、不安、悲しみ、楽しみ、をそれぞれ現在の感情を最大100として数値で表してください。書き方は、　興奮:100 不安:100 悲しみ:100 楽しみ:100　とだけ書いてください。短ければERRORとだけ表示してください。",
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
	 const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            const validMessages = messages.filter(
                (msg) => msg.content !== null && msg.content !== undefined
            );

            const response = await fetch("/api/journaling", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                     "X-CSRF-TOKEN": csrfToken,
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

    const handleSaveAnalyze = async (event) => {
        event.preventDefault();
        if (content.trim() === "") {
            setModalMessage("申し訳ありません！解析できなかったようです…");
            setIsModalOpen(true);
            return;
        }
        const userMessage = { role: "user", content: content };
        const updatedHistory = [...conversationHistory, userMessage];
        setConversationHistory(updatedHistory);
        await saveJournaling(title, content);
        await sendMessageToAPI(updatedHistory);
        setContent("");
        setTitle("");
        handleFocus_title();
        handleFocus_text();
    };

    const handleAnalyzeOnly = async (event) => {
        event.preventDefault();
        if (content.trim() === "") {
            setModalMessage("申し訳ありません！解析できなかったようです…");
            setIsModalOpen(true);
            return;
        }
        const userMessage = { role: "user", content: content };
        const updatedHistory = [...conversationHistory, userMessage];
        setConversationHistory(updatedHistory);
        await sendMessageToAPI(updatedHistory);
        setContent("");
        setTitle("");
        handleFocus_title();
        handleFocus_text();
    };

    const saveJournaling = async (title, content) => {
        try {
            const token = sessionStorage.getItem("token");

	 const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            const response = await fetch("/api/saveJournaling", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
		 "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify({ title, content }),
            });

            if (!response.ok) {
                throw new Error("レスポンス取得失敗");
            }
        } catch (error) {
            console.error("saveJournaling失敗:", error);
        }
    };

    const fetchJournalingTitles = async () => {
        try {
            const token = sessionStorage.getItem("token");

            const response = await fetch(`/api/showJournaling`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch journaling titles");
            }

            const data = await response.json();
            setJournalingTitles(data);
        } catch (error) {
            console.error("Error fetching journaling titles:", error);
        }
    };

    const fetchJournalingContent = async (id) => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await fetch(`/api/showJournaling/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch journaling content");
            }
            handleFocus_title();
            handleFocus_text();

            const data = await response.json();
            setSelectedJournalingContent(data.content);
            setSelectedJournalingTitle(data.title);
            setSelectedJournalingCreatedAt(data.created_at);
            setSelectedJournalingId(id);
            setIsTitleModalOpen(true);
        } catch (error) {
            console.error("Error fetching journaling content:", error);
        } finally {
            setIsLoadingHistory(false);
        }
    };

    const handleHistoryClick = () => {
        fetchJournalingTitles();
    };

    const handleTitleChange = (event) => {
        const journalingId = event.target.value;
        if (journalingId) {
            setIsLoadingHistory(true);
            fetchJournalingContent(journalingId);
        }
        event.target.selectedIndex = 0;
    };

    const truncateTitle = (title, maxLength) => {
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + "...";
        }
        return title;
    };

    const handleCloseModal3 = () => {
        setIsTitleModalOpen(false);
        setPlaceholder_Text("気持ちのままに書いてみてください");
        setPlaceholder_Title("No Title");
    };

    const convertNewlinesToBreaks = (text) => {
        return text.split("\n").map((item, index) => (
            <React.Fragment key={index}>
                {item}
                <br />
            </React.Fragment>
        ));
    };

    const TitleModal = ({
        isOpen,
        onClose,
        content,
        createdAt,
        title,
        onDelete,
    }) => {
        const [isConfirmOpen, setIsConfirmOpen] = useState(false);

        const handleDeleteClick = () => {
            event.stopPropagation();
            setIsConfirmOpen(true);
        };

        const handleConfirmDelete = () => {
            event.stopPropagation();
            setIsConfirmOpen(false);
            onDelete();
        };

        const handleCancelDelete = () => {
            event.stopPropagation();
            setIsConfirmOpen(false);
        };

        if (!isOpen) return null;
        return (
            <div className="titlemodal">
                <div className="titlemodal-content">
                    <span className="close" onClick={handleCloseModal3}>
                        &times;
                    </span>
                    <p>{title}</p>
                    <p>
                        {new Date(createdAt).toLocaleDateString("ja-JP", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                        })}
                    </p>
                    <div className="content">
                        {convertNewlinesToBreaks(content)}
                    </div>
                </div>
                <button className="delete-button" onClick={handleDeleteClick}>
                    Delete
                </button>
                {isConfirmOpen && (
                    <div className="confirm-modal">
                        <div className="confirm-modal-content">
                            <p>本当に削除してもよろしいですか？</p>
                            <div className="button-group">
                                <button
                                    className="YES"
                                    onClick={handleConfirmDelete}
                                >
                                    はい
                                </button>
                                <button
                                    className="NO"
                                    onClick={handleCancelDelete}
                                >
                                    いいえ
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const handleDeleteJournaling = async (id) => {
        try {
            const token = sessionStorage.getItem("token");
	  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const response = await fetch(`/api/deleteJournaling/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
		 "X-CSRF-TOKEN": csrfToken,
                },
            });

            if (!response.ok) {
                throw new Error("ジャーナルの削除に失敗しました");
            }

            setIsTitleModalOpen(false);
            
            handleBlur();
        } catch (error) {
            console.error("ジャーナルの削除に失敗しました:", error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "title") {
            setTitle(value);
        } else if (name === "content") {
            setContent(value);
        }
    };

    const handleFocus_text = () => {
        setPlaceholder_Text("");
    };

    const handleFocus_title = () => {
        setPlaceholder_Title("");
    };

    const handleBlur = () => {
        if (content === "") {
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
                        <form className={styles.form}>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={handleInputChange}
                                placeholder={placeholder_Title}
                                className={styles.journaling_title}
                                onFocus={handleFocus_title}
                                onBlur={handleBlur}
				onKeyDown={handleKeyDown}
                            />
                            <textarea
                                type="text"
                                name="content"
                                value={content}
                                onChange={handleInputChange}
                                placeholder={placeholder_Text}
                                className={styles.journaling_text}
                                onFocus={handleFocus_text}
                                onBlur={handleBlur}
                            />
                            <div className={styles.button_container}>
                                <button
                                    type="button"
                                    className={styles.save_button}
                                    onClick={handleSaveAnalyze}
                                >
                                    保存して解析
                                </button>
                                <button
                                    type="button"
                                    className={styles.analysis_button}
                                    onClick={handleAnalyzeOnly}
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
                    <select
                        className={styles.history}
                        onClick={handleHistoryClick}
                        onChange={handleTitleChange}
                    >
                        <option value="">Journaling History</option>
                        {journalingTitles.map((journaling) => (
                            <option key={journaling.id} value={journaling.id}>
                                {truncateTitle(journaling.title, 7)} |{" "}
                                {new Date(
                                    journaling.created_at
                                ).toLocaleDateString("ja-JP", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                })}
                            </option>
                        ))}
                    </select>
                    <select
                        className={styles.select_background}
                        onChange={handleBackgroundChange}
                    >
                        <option value="">シンプル</option>
			<option value="url('/dark2.jpg')">ダーク</option>
			<option value="url('/background2.jpg')">薄明</option>
			<option value="url('/bonfire.jpg')">焚火</option>
			<option value="url('/okunoto.jpg')">千枚田</option>
                        <option value="url('/rain.jpg')">雨跡</option>
			<option value="url('/hydrangea.jpg')">紫陽花</option>
			<option value="url('/summer_night.jpg')">夏の夜</option>
			<option value="url('/firework6.jpg')">花火</option>
			<option value="url('/ocean4.jpg')">海</option>
			<option value="url('/yakushimax1.jpg')">屋久島</option>
			<option value="url('/ocean2.jpg')">夕暮れ</option>
			<option value="url('/moon2.jpg')">満月</option>
			<option value="url('/mtfuji2.jpg')">雪嶺</option>
			<option value="url('/dog2.jpg')">犬</option>
			<option value="url('/cat_window2.jpg')">猫</option>
			<option value="url('/desk.jpg')">デスク</option>
			<option value="url('/coffee.jpg')">珈琲</option>
			<option value="url('/room.jpg')">リビング</option>
			<option value="url('/building.jpg')">ビル</option>
			<option value="url('/background1.jpg')">opera</option>
                    </select>
                    <Modal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        scores={emotionScores}
                        message={modalMessage}
                    />
                    <LoadingModal isOpen={isLoading} />
                    <LoadingModalHistory isOpen={isLoadingHistory} />
                    <TitleModal
                        isOpen={isTitleModalOpen}
                        onClose={() => setIsTitleModalOpen(false)}
                        content={selectedJournalingContent}
                        createdAt={selectedJournalingCreatedAt}
                        title={selectedJournalingTitle}
                        onDelete={() =>
                            handleDeleteJournaling(selectedJournalingId)
                        }
                    />
                </div>
            ) : (
                <RecommendList mood={selectedMood} genres={selectedGenres} />
            )}
        </Layout>
    );
}

