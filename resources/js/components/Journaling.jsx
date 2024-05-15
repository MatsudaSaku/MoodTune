import Layout from "./Layout";
import styles from "../../css/journaling.module.css";
import { useState, useEffect } from "react";

export function Journaling() {
    const [messageInput, setMessageInput] = useState("");
    const [conversationHistory, setConversationHistory] = useState([]);
    const [chatDisplay, setChatDisplay] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [backgroundImage, setBackgroundImage] = useState("");
    const [animationClass, setAnimationClass] = useState("");

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

    const updateChatDisplay = (message) => {
        const messageElements = message
            .split(/(?<=[。？！])/)
            .map((line, index) => (
                <React.Fragment key={index < message.length - 1 && <br />}>
                    <div className="fadeInUp">{line}</div>
                    <br />
                </React.Fragment>
            ));

        setChatDisplay([...chatDisplay, { message: messageElements }]);
    };

    const sendMessageToAPI = async (messages) => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ messages }),
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
        const userMessage = { role: "user", content: messageInput };
        const updatedHistory = [...conversationHistory, userMessage];
        setConversationHistory(updatedHistory);
        await sendMessageToAPI(updatedHistory);
        setMessageInput("");
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "title") {
            setTitle(value);
        } else if (name === "text") {
            setText(value);
        }
    };

    return (
        <Layout>
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
                            placeholder="TITLE"
                            className={styles.journaling_title}
                        />
                        <textarea
                            type="text"
                            name="text"
                            value={text}
                            onChange={handleInputChange}
                            placeholder="気持ちのままに書いてみてください"
                            className={styles.journaling_text}
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
            </div>
        </Layout>
    );
}
