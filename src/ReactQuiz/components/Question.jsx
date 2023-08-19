import { useReactQuizContext } from "../context/ReactQuizContext";
import Options from "./Options";

const Question = () => {
  const { questions, index } =
    useReactQuizContext();
  return (
    <>
      <div>
        <h4>{questions[index]?.question}</h4>
        <Options />
      </div>
    </>
  );
};

export default Question;
