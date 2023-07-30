import { actions } from "../reducer/questionsReducer";

const Options = ({ question, dispatch, answer }) => {
  const hasAnswered = answer !== null;

  const handleButtonClick = (index) => {
    dispatch({
      type: actions.newAnswer,
      payload: index,
    });
  };

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index == answer ? "answer" : ""}  ${
            hasAnswered
              ? index == question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }  `}
          key={option}
          onClick={() => handleButtonClick(index)}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
