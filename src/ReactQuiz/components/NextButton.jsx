import { actions } from "../reducer/questionsReducer";

const NextButton = ({ dispatch, answer, index, questionsTotal }) => {
  const handleClick = () => {
    dispatch({
      type: actions.nextQuestion,
    });
  };

  const handleFinished = () => {
    dispatch({ type: actions.finished });
  };

  if (answer == null) return null;

  if (index < questionsTotal - 1)
    return (
      <>
        <button className="btn btn-ui" onClick={handleClick}>
          Next
        </button>
      </>
    );
  if (index == questionsTotal - 1)
    return (
      <>
        <button className="btn btn-ui" onClick={handleFinished}>
          Finished
        </button>
      </>
    );
};

export default NextButton;
