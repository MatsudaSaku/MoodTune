import React from "react";
import ReactMarkdown from "react-markdown";

export default function Modal({
    isOpen,
    onClose,
    onClose2,
    scores,
    message,
    selectedMood,
    selectedGenres,
    feedback,
    handleClick,
}) {
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

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose2}>
                    &times;
                </span>
                <h2>あなたの気分は…</h2>
                <p>興奮　: {scores.excitement}</p>
                <p>不安　: {scores.anxiety}</p>
                <p>悲しみ: {scores.sadness}</p>
                <p>楽しみ: {scores.joy}</p>
                <h3>という解析をしました！</h3>
                <button className="recommend" onClick={handleClick}>
                    今のあなたにおススメの音楽は　「{selectedMood}、
                    {selectedGenres.join(" ")}
                    　」です。
                </button>
                <h2 className="feedback_title">AIからのフィードバック</h2>
                <div className="feedback_content">
                    <ReactMarkdown>{feedback}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
