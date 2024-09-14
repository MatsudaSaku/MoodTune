import React from "react";

export default function LoadingModal({ isOpen }) {
    if (!isOpen) return null;

    return (
        <div className="modal_loading">
            <div className="modal_content_loading">
                <div className="loader"></div>
                <h2>解析中...</h2>
            </div>
        </div>
    );
}
