import { actions } from "../reducer/questionsReducer";

const NextButton = ({ dispatch, answer }) => {
  const handleClick = () => {
    dispatch({
      type: actions.nextQuestion,
    });
  };

  return answer !== null ? (
    <>
      <button className="btn btn-ui" onClick={handleClick}>
        Next
      </button>
    </>
  ) : null;
};

export default NextButton;
