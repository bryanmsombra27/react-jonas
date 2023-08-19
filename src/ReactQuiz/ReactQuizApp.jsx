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
import { useReactQuizContext } from "./context/ReactQuizContext";

const statusApp = {
  loading: "loading",
  error: "error",
  ready: "ready",
  active: "active",
  finished: "finished",
};


const ReactQuizApp = () => {

  const { status, dispatch } =
    useReactQuizContext();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({
          type: actions.dataReceived,
          payload: data,
        });

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
            <StartScreen />
          )}
          {status == statusApp.active && (
            <>
              <Progress />
              <Question />
              <Footer>
                <Timer />
                <NextButton />
              </Footer>
            </>
          )}

          {status == statusApp.finished && (
            <FinishScreen />
          )}
        </Main>
      </div>

    </>
  );
};

export default ReactQuizApp;
