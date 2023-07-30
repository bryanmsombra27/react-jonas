import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import "./index.css";
import questionsReducer, { actions } from "./reducer/questionsReducer";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};
const statusApp = {
  loading: "loading",
  error: "error",
  ready: "ready",
  active: "active",
};

const ReactQuizApp = () => {
  const [questionState, dispatch] = useReducer(questionsReducer, initialState);

  const { status, questions, index, answer, points } = questionState;
  const questionsTotal = questions.length;
  const totalPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({
          type: actions.dataReceived,
          payload: data,
        });

        console.log(data);
      } catch (error) {
        dispatch({
          type: actions.dataFailed,
        });
      }
    };

    fetchApi();
  }, []);

  return (
    <>
      <div className="app">
        <Header />
        <Main>
          {status == statusApp.loading && <Loader />}
          {status == statusApp.error && <Error />}
          {status == statusApp.ready && (
            <StartScreen questionsTotal={questionsTotal} dispatch={dispatch} />
          )}
          {status == statusApp.active && (
            <>
              <Progress
                index={index}
                numQuestions={questionsTotal}
                points={points}
                totalPoints={totalPoints}
                answer={answer}
              />
              <Question
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
              <NextButton dispatch={dispatch} answer={answer} />
            </>
          )}
        </Main>
      </div>
    </>
  );
};

export default ReactQuizApp;
