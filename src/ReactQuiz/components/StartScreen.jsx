import { useReactQuizContext } from "../context/ReactQuizContext";
import { actions } from "../reducer/questionsReducer";

const StartScreen = () => {
  const { questions, dispatch } =
    useReactQuizContext();
  const questionsTotal = questions.length;

  const handleClick = () => {
    dispatch({
      type: actions.start,
    });
  };

  return (
    <>
      <div className="start">
        <h2>Welcome to React Quiz!</h2>
        <h3>{questionsTotal} questions to test your react mastery</h3>

        <button className="btn btn-ui" onClick={handleClick}>
          Let's start
        </button>
      </div>
    </>
  );
};

export default StartScreen;
