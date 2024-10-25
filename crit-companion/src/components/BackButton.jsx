import React from "react";
import { useNavigate } from "react-router-dom"; // Use this for navigation if using React Router

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";

import "./BackButton.css"; // Optional: Add custom styling

function BackButton() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <button onClick={handleBackClick} className="back-button">
            <FontAwesomeIcon icon={faCaretLeft} />
        </button>
    );
}

export default BackButton;
