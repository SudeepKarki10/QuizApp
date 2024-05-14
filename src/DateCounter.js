import { useReducer } from "react";

/* 

Why useReducer hook?
-> State management is not enough in some cases
->When components have a lot of state variables and state updates,
spread across many event handlers all over the component
-> when multiple state updates needs to happen at the same time 
-> When updating one state depends on one or multiple other pieces of state

Managing STATE with useReducer:
-> It is an alternative way of setting state, idea for complex state and relative pieces of state
-> Stores the related pieces of state in a state Object
-> Uses reducer function containing all the logic to update state
  it is same as setState() function in useState but with additional functionalities.
-> reducer function takes the current state and action and returns the next state

-> Action is the object that describes how to update state
-> dispatch function is used to triger state updates by sending actions from the event handler functions to the reducer function specifying the type of actions.



*/

function reducer(state, action) {
  // whatever returned by reducer function becomes new state
  console.log(state, action);

  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step };

    case "dec":
      return { ...state, count: state.count - state.step };

    case "setCount":
      return { ...state, count: action.payload };

    case "setStep":
      return { ...state, step: action.payload };

    case "reset":
      return { count: 0, step: 1 };

    default:
      throw new Error("Unknown action");
  }
}

//this is wrong approach to use useRef multiple times as we can perform for both state using single useRef as above
// function reducer2(state, action) {
//   if (action.type === "setStep") {
//     return action.payload;
//   }
// }

function DateCounter() {
  // const [count, setCount] = useState(0); using useReducer as bwlow instead of useState

  //creating the initialState for both count and step as
  const initialState = { count: 0, step: 3 };
  const [state, dispatch] = useReducer(reducer, initialState);

  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");

  date.setDate(date.getDate() + count);

  // Dispatch is envoked inside the event handler funcctions to trigger state updates
  const dec = function () {
    // // setCount((count) => count - 1);
    // setCount((count) => count - step);
    dispatch({ type: "dec" });
  };

  const inc = function () {
    // // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    //setCount(Number(e.target.value));
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
