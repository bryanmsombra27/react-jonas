import { useEffect, useState } from "react";
import { actions } from "../reducer/questionsReducer";
import { useReactQuizContext } from "../context/ReactQuizContext";

const Timer = () => {
  const { dispatch, timeRemining } =
    useReactQuizContext();

  const mins = Math.floor(timeRemining / 60);
  const seconds = timeRemining % 60;
  useEffect(() => {
    const setTimer = setInterval(() => {
      dispatch({ type: actions.tick });
    }, 1000);

    return () => {
      clearInterval(setTimer);
    };
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
};

export default Timer;
