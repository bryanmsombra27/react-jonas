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
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timeRemining: null,
};
const statusApp = {
  loading: "loading",
  error: "error",
  ready: "ready",
  active: "active",
  finished: "finished",
};

const ReactQuizApp = () => {
  const [questionState, dispatch] = useReducer(questionsReducer, initialState);

  const { status, questions, index, answer, points, highscore, timeRemining } =
    questionState;
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
              <Footer>
                <Timer dispatch={dispatch} timeRemining={timeRemining} />
                <NextButton
                  dispatch={dispatch}
                  answer={answer}
                  index={index}
                  questionsTotal={questionsTotal}
                />
              </Footer>
            </>
          )}

          {status == statusApp.finished && (
            <FinishScreen
              points={points}
              totalPoints={totalPoints}
              highscore={highscore}
              dispatch={dispatch}
            />
          )}
        </Main>
      </div>
    </>
  );
};

export default ReactQuizApp;
