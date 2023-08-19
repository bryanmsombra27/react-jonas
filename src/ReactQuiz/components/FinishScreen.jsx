import { useReactQuizContext } from "../context/ReactQuizContext";
import { actions } from "../reducer/questionsReducer";

const FinishScreen = () => {
  const { questions, dispatch, points, highscore } =
    useReactQuizContext();

  const totalPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );
  const percentage = (points * 100) / totalPoints;
  let emoji;
  if (percentage == 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "😅";
  if (percentage >= 0 && percentage < 50) emoji = "🤔";
  if (percentage == 0) emoji = "🤦‍♂️";

  const handleReset = () => {
    dispatch({
      type: actions.reset,
    });
  };

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {totalPoints} ({percentage.toFixed(2)}
        %)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>

      <button className="btn btn-ui" onClick={handleReset}>
        Restart Quiz
      </button>
    </>
  );
};

export default FinishScreen;
