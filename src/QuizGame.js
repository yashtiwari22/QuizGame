import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";

import "./QuizGame.css";
const QuizGame = () => {
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState(Array(5).fill(null));
  const [isWinner, setIsWinner] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    generateOptions();
  }, []);

  const generateOptions = () => {
    const randomOptions = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 100 + 1)
    );
    setOptions(randomOptions);
  };

  const handleDragStart = (event, optionIndex) => {
    event.dataTransfer.setData("optionIndex", optionIndex);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, inputIndex) => {
    event.preventDefault();
    const optionIndex = event.dataTransfer.getData("optionIndex");
    const draggedOption = options[optionIndex];

    // If the drop zone is already filled, swap the values
    if (input[inputIndex]) {
      const existingOption = input[inputIndex];
      const existingOptionIndex = options.findIndex(
        (option) => option === draggedOption
      );
      const updatedOptions = [...options];
      updatedOptions[existingOptionIndex] = existingOption;
      setOptions(updatedOptions);
      const updatedInput = [...input];
      updatedInput[inputIndex] = draggedOption;
      setInput(updatedInput);
    } else {
      if (drop === false) {
        const updatedInput = [...input];
        updatedInput[inputIndex] = draggedOption;
        setInput(updatedInput);
        const updatedOptions = [...options];
        updatedOptions.splice(optionIndex, 1);
        setOptions(updatedOptions);
      } else {
        const data = event.dataTransfer.getData("inputIndex");
        const draggedOption = input[data];
        const updatedInput = [...input];
        updatedInput[inputIndex] = draggedOption;
        updatedInput[data] = null;
        setInput(updatedInput);
        setDrop(false);
      }
    }
  };
  const handleOptionDragStart = (event, inputIndex) => {
    event.dataTransfer.setData("inputIndex", inputIndex);
    setDrop(true);
  };

  const handleOptionDragOver = (event) => {
    event.preventDefault();
  };

  const handleOptionDrop = (event, optionIndex) => {
    event.preventDefault();
    const inputIndex = event.dataTransfer.getData("inputIndex");
    const draggedItem = input[inputIndex];
    if (draggedItem) {
      const updatedOptions = [...options];
      updatedOptions.splice(optionIndex, 0, draggedItem);
      setOptions(updatedOptions);
      const updatedInput = [...input];
      updatedInput[inputIndex] = null;
      setInput(updatedInput);
    }
  };

  const checkResult = () => {
    const sortedInput = [...input].sort((a, b) => a - b);
    const isCorrect = JSON.stringify(sortedInput) === JSON.stringify(input);
    setIsWinner(isCorrect);
    setShowResult(true);
  };

  const resetGame = () => {
    generateOptions();
    setInput(Array(5).fill(null));
    setShowResult(false);
  };
  const list = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const item = {
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.3,
        duration: 1,
      },
    }),
    hidden: { opacity: 0, x: 0 },
  };

  return (
    <div className="quiz">
      {!showResult && (
        <div className="headings">
          <h1>
            <span style={{ color: "#FF0000" }}>Arrange</span>{" "}
            <span style={{ color: "#E700D0" }}>in</span>{" "}
            <span style={{ color: "#006AFF" }}>Ascending </span>
            <span style={{ color: "#49D879" }}>Order</span>
          </h1>
          <p style={{ marginBottom: "20px" }}>
            Arrange the given numbers in ascending order by dragging and
            dropping the cards in correct order.
          </p>
        </div>
      )}

      {!showResult && (
        <div className="container">
          <motion.div
            className="option-container"
            variants={list}
            initial="hidden"
            animate="visible"
          >
            {options.map((option, index) => (
              <motion.div
                key={index}
                custom={index}
                className="box"
                variants={item}
                draggable
                onDragStart={(event) => handleDragStart(event, index)}
                onDragOver={handleOptionDragOver}
                onDrop={(event) => handleOptionDrop(event)}
              >
                {option}
              </motion.div>
            ))}
          </motion.div>
          <div className="dropped-zone">
            {input.map((value, index) => (
              <motion.div
                key={index}
                className="drop-box"
                initial={{ scale: 0 }}
                animate={{ rotate: value ? 360 : 0, scale: 1 }}
                transition={{
                  ease: "linear",
                  delay: 0.1,
                }}
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, index)}
                draggable={value !== null}
                onDragStart={(event) => handleOptionDragStart(event, index)}
              >
                {value ? value : <p>Drop</p>}
              </motion.div>
            ))}
          </div>
          <button disabled={input.includes(null)} onClick={checkResult}>
            Check
          </button>
        </div>
      )}
      {showResult && isWinner && (
        <div>
          <Player
            autoplay
            loop
            src="https://assets2.lottiefiles.com/packages/lf20_5vfzmcqx.json"
            style={{ height: "200px", width: "400px" }}
          />
          <div className="reset">
            <p>You won</p>
            <button onClick={resetGame}>Reset</button>
          </div>
        </div>
      )}
      {showResult && !isWinner && (
        <div>
          <div className="reset">
            <p>You lost! Please Click reset to play another round.</p>
            <button onClick={resetGame}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizGame;
