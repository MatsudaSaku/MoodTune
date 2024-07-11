import React, { useState, useEffect, useRef } from "react";
import Layout from "./Layout";
import styles from "../../css/chat.module.css";

function Chat() {
    const [messageInput, setMessageInput] = useState("");
    const [conversationHistory, setConversationHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [tone, setTone] = useState("敬語");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        sendInitialMessage();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [conversationHistory]);

    const sendInitialMessage = async (selectedTone) => {
        setIsLoading(true);
        try {
            const toneMessageMap = {
                敬語: "敬語で会話してください。",
                丁寧侍: "礼儀正しい侍口調で会話してください。",
                豪放侍: "粗野で豪快な侍口調で会話してください。",
                ギャル: "ギャル口調で会話してください。",
                関西弁: "関西弁で会話してください。",
                博多弁: "博多弁で会話してください",
            };

            const initialSystemMessage = {
                role: "system",
                content: `
                    あなたがユーザーに対して五つの質問を一つ一つしてください。
                    あなたが五つ質問をしてユーザーが五つ回答したら、
                    それまでのユーザーの回答を振り返り解析して、
                    四つの感情である、ストレス、リラックス、ポジティブ、ネガティブ、
                    をそれぞれ最大で100として現在の感情を数値で表してください。
		    その数値を元におススメの音楽のジャンルを挙げてください。
                    ${toneMessageMap[selectedTone]}
                    ユーザーの答えに対してはコメントしてください。
                    質問はある程度の長さで、一つずつおこなってください
                `,
            };

            const updatedHistory = [initialSystemMessage];
            await setConversationHistory(updatedHistory);
            await sendMessageToAPI(updatedHistory);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessageToAPI = async (messages) => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
		 "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content')
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
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (event) => {
        setMessageInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userMessage = { role: "user", content: messageInput };
        const updatedHistory = [...conversationHistory, userMessage];
        setConversationHistory(updatedHistory);
        setMessageInput("");
        await sendMessageToAPI(updatedHistory);
    };

    const handleToneChange = async (event) => {
        const newTone = event.target.value;
        setTone(newTone);
        setMessageInput("");
        await resetConversation();
        await sendInitialMessage(newTone);
    };

    const resetConversation = () => {
        return new Promise((resolve) => {
            setConversationHistory([]);
            resolve();
        });
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Layout>
            <div className={styles.chat_container}>
                <h3 className={styles.explanation}>
                    ５つの質問の答えから「ストレス」「リラックス」「ポジティブ」「ネガティブ」の計測をします。
                </h3>
                {conversationHistory
                    .filter((item) => item.role !== "system")
                    .map((item, index) => (
                        <div
                            key={index}
                            className={
                                item.role === "user"
                                    ? styles.user_message
                                    : styles.api_message
                            }
                            style={{
                                marginBottom: "10px",
                                padding: "25px",
                                borderBottom: "1px solid #ccc",
                            }}
                        >
                            {item.content
                                .split(/(?<=[。？！])/)
                                .map((line, index) => (
                                    <React.Fragment key={index}>
                                        <div className="fadeInUp">{line}</div>
                                        <br />
                                    </React.Fragment>
                                ))}
                        </div>
                    ))}
                {isLoading && <div className={styles.loading}>Loading...</div>}
                <div ref={messagesEndRef} />
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={messageInput}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                    className={styles.chat_input}
                />
                <select
                    value={tone}
                    onChange={handleToneChange}
                    className={styles.tone_select}
                >
                    <option value="敬語">敬語</option>
                    <option value="丁寧侍">丁寧侍</option>
                    <option value="豪放侍">豪放侍</option>
                    <option value="ギャル">ギャル</option>
                    <option value="関西弁">関西弁</option>
                    <option value="博多弁">博多弁</option>
                </select>
            </form>
        </Layout>
    );
}

export default Chat;

