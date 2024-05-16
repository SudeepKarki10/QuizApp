import { useEffect, useReducer, useRef } from "react";
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Nextbutton from "./Nextbutton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

export default function App() {
  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return {
          ...state,
          questions: action.payload,
          status: "ready",
        };

      case "dataFailed":
        return {
          ...state,
          status: "error",
        };

      case "start":
        return {
          ...state,
          status: "active",
        };

      case "newAnswer":
        const question = state.questions.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };

      case "nextQuestion":
        return {
          ...state,
          index: state.index + 1,
          answer: null,
        };

      case "finish":
        return {
          ...state,
          status: "finished",
        };

      default:
        return new Error("Unknown Error!");
    }
  }

  const initialstate = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
  };

  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialstate
  );

  // console.log(questions, status);

  const numQuestions = questions.length;

  const maxPossiblePoints = questions.reduce(
    (total, question) => total + question.points,
    0
  );

  useEffect(() => {
    console.log(initialstate);
    async function fetchdata() {
      // const res = await fetch("http://localhost:8000/questions");
      // const data = await res.json();
      // console.log(data);

      fetch("http://localhost:8000/questions")
        .then((res) => res.json())
        .then((data) => dispatch({ type: "dataReceived", payload: data }))
        .catch((err) => dispatch({ type: "dataFailed" }));
    }

    fetchdata();
  }, []);

  return (
    <div className="app">
      <Header />

      <main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}

        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            {index !== numQuestions && (
              <Nextbutton
                dispatch={dispatch}
                answe={answer}
                index={index}
                numQuestions={numQuestions}
              />
            )}
          </>
        )}

        {status === "finished" && (
          <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} />
        )}
      </main>
    </div>
  );
}
