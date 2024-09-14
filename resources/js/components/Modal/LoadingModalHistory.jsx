import React from "react";

export default function LoadingModalHistory({ isOpen }) {
    if (!isOpen) return null;

    return (
        <div className="modal_loading">
            <div className="modal_content_loading">
                <div className="loader"></div>
                <h2>ジャーナルを表示します...</h2>
            </div>
        </div>
    );
}
