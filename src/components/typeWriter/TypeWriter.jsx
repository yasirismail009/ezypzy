import React, { useState, useEffect } from "react";
import "./TypeWriter.css";

const TypewriterEffect = ({ text, speed }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentText((prevText) => prevText + text[currentIndex]);
      setCurrentIndex((prevIndex) => prevIndex + 8);
    }, speed);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentIndex, speed, text]);

  return (
    <div className="typewriter-effect">
      <span>{currentText}</span>
    </div>
  );
};

export default TypewriterEffect;
