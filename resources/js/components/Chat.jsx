
import React, { useState, useEffect, useRef } from "react";
import Layout from "./Layout";
import styles from "../../css/chat.module.css";


function Chat() {
    const [messageInput, setMessageInput] = useState("");
    const [conversationHistory, setConversationHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        sendInitialMessage();
    }, []);

    useEffect(() => {
        console.log("Updated conversation history:", conversationHistory);
        scrollToBottom();
    }, [conversationHistory]);

    const sendInitialMessage = async () => {
        setIsLoading(true);
        try {
            const initialSystemMessage = {
                role: "system",
                content:
                    "あなたがユーザーに対して五つの質問を一つ一つしてください。あなたが五つ質問をしてユーザーが五つ回答したら、それまでのユーザーの回答を振り返り解析して、四つの感情である、ストレス、リラックス、ポジティブ、ネガティブ、をそれぞれ最大で100として現在の感情を数値で表してください。侍口調で会話してください。ユーザーの答えに対してはコメントしてください。質問はある程度の長さで、一つずつおこなってください",
            };
            const updatedHistory = [
                ...conversationHistory,
                initialSystemMessage,
            ];
            setConversationHistory(updatedHistory);
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

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Layout>
            <div className={styles.chat_container}>
                <h3 className={styles.explanation}>
                    五つの質問の答えから「ストレス」「リラックス」「ポジティブ」「ネガティブ」の計測をします。
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
                                padding: "5px",
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
            </form>
        </Layout>
    );
}

export default Chat;

