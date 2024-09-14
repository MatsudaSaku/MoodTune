import React, { useState } from "react";

export default function TitleModal({
    isOpen,
    onClose,
    content,
    createdAt,
    title,
    onDelete,
    convertNewlinesToBreaks,
}) {
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
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <p className="history-title">{title}</p>
                <p className="history-date">
                    {new Date(createdAt).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    })}
                </p>
                <div className="history-content">
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
                            <button className="NO" onClick={handleCancelDelete}>
                                いいえ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
