import React, { useState, useEffect } from "react";
import "./TypeWriter.css";

const TypewriterEffect = ({ text, speed, onComplete }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimeout(timeout);
      } else {
        animateText();
      }
    };

    const animateText = () => {
      if (currentIndex < text.length) {
        timeout = setTimeout(() => {
          setCurrentText((prevText) => prevText + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, speed);
      } else {
        // Typing animation is complete
        if (onComplete) {
          alert("cakk")
          onComplete();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    animateText(); // Start animation immediately

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [currentIndex, speed, text, onComplete]);

  return (
    <div className="typewriter-effect">
      <span>{currentText}</span>
    </div>
  );
};

export default TypewriterEffect;
