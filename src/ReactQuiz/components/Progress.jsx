import { useReactQuizContext } from "../context/ReactQuizContext";

const Progress = () => {
  const { questions, index, points, answer } =
    useReactQuizContext();
  const numQuestions = questions.length;

  const totalPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  return (
    <>
      <header className="progress">
        <progress
          max={numQuestions}
          value={index + Number(answer !== null)}
        ></progress>
        <p>
          Question{" "}
          <strong>
            {index + 1} / {numQuestions}{" "}
          </strong>{" "}
        </p>
        <p>
          <strong>
            {points} / {totalPoints}{" "}
          </strong>
        </p>
      </header>
    </>
  );
};

export default Progress;
