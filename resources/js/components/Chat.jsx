import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import styles from "../../css/chat.module.css";
//import "../../css/modal.css";

function Chat() {
    const [messageInput, setMessageInput] = useState("");
    const [conversationHistory, setConversationHistory] = useState([]);
    const [chatDisplay, setChatDisplay] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        sendInitialMessage();
    }, []);

    useEffect(() => {
        console.log("Updated conversation history:", conversationHistory);
    }, [conversationHistory]);

    const sendInitialMessage = async () => {
        setIsLoading(true);
        try {
            const initialSystemMessage = {
                role: "system",
                content:
                    "あなたがユーザーに対して五つの質問を一つ一つしてください。あなたが五つ質問をしてユーザーが五つ回答したら、それまでのユーザーの回答を振り返り解析して、四つの感情である、ポジティブ、ネガティブ、ストレス、リラックスを四つ全部で100としてそれぞれの現在の感情を数値で表してください。侍口調で会話してください。ユーザーの答えに対してはコメントしてください。質問はある程度の長さで、一つずつおこなってください",
                //"あなたがユーザーに対して五つの質問を一つ一つしてください。あなたが五つ質問をしてユーザーが五つ回答したら、それまでのユーザーの回答を振り返り解析して、四つの感情である、興奮、不安、悲しみ、楽しみ、を四つ全部で100としてそれぞれの現在の感情を数値で表してください。侍口調で会話してください",
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

	console.log("sendMessageToAPI called with messages:", messages);

        try {
/*		const csrfTokenElement = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        if (!csrfTokenElement) {
            throw new Error("CSRF token element not found");
        }

        const csrfToken = csrfTokenElement.getAttribute('content');
        if (!csrfToken) {
            throw new Error("CSRF token not found");
        }*/

		const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
			"X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify({ messages }),
            });

	console.log("Response Status:", response.status);
        console.log("Response Headers:", response.headers);
        
        const responseBody = await response.text();

        console.log("Response Text:", responseBody);

            if (!response.ok) {
                console.error("Response Error:", await responseBody);
                throw new Error("Network response was not ok");
            }

		const data = JSON.parse(responseBody);
        const newMessage = {
            role: "assistant",
            content: data.choices[0].message.content,
        };

/*            const data = await response.json();
            const newMessage = {
                role: "assistant",
                content: data.choices[0].message.content,
            };*/
            const updatedHistory = [...messages, newMessage];
            setConversationHistory(updatedHistory);
            updateChatDisplay(newMessage.content);
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
        await sendMessageToAPI(updatedHistory);
        setMessageInput("");
    };

    const updateChatDisplay = (message) => {
        const messageElements = message
            .split(/(?<=[。？！])/)
            .map((line, index) => (
                <React.Fragment key={index}>
                    <div className="fadeInUp">{line}</div>
                    <br />
                </React.Fragment>
            ));

        setChatDisplay([...chatDisplay, { message: messageElements }]);
    };

    /*const LoadingModal = ({ isOpen }) => {
        if (!isOpen) return null;

        return (
            <div className="modal_loading">
                <div className="modal_content_loading">
                    <div className="loader"></div>
                    <h2>解析中...</h2>
                </div>
            </div>
        );
    };*/

    return (
        <Layout>
            <div className={styles.chat_container}>
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
                {isLoading && <div>Loading...</div>}
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
		<input
                    type="text"
                    value={messageInput}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                    className={styles.chat_input}
                />
                <button type="submit" className={styles.chat_button}>
                    Send
                </button>
            </form>
        </Layout>
    );
}

export default Chat;
