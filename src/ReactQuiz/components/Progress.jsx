const Progress = ({ index, numQuestions, points, totalPoints, answer }) => {
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
