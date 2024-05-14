import React from "react";

const StartScreen = ({ numQuestions, dispatch }) => {
  return (
    <div className="startdiv">
      <h2 className="secondary">Welcome to the React Quiz</h2>
      <p>{numQuestions} questions to test your React Mastery</p>
      <button className="btn" onClick={() => dispatch({ type: "start" })}>
        Let's Start
      </button>
    </div>
  );
};

export default StartScreen;
