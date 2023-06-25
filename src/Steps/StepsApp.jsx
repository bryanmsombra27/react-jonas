import { useState } from "react";
import "./index.css";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const StepsApp = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handleAdd = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };
  const handleRest = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="close" onClick={handleClose}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`${step >= 1 && "active"}`}>1</div>
            <div className={`${step >= 2 && "active"}`}>2</div>
            <div className={`${step >= 3 && "active"}`}>3</div>
          </div>

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>
          <div className="buttons">
            <Button clickHandler={handleRest} color="#fff" background="#7950f2">
              <span>👈</span>
              Previous
            </Button>
            <Button clickHandler={handleAdd} color="#fff" background="#7950f2">
              Next
              <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

const Button = ({ color, background, clickHandler, children }) => {
  return (
    <>
      <button
        style={{ color, background }}
        // className="next"
        onClick={clickHandler}
      >
        {children}
      </button>
    </>
  );
};
const StepMessage = ({ step, children }) => {
  return (
    <>
      <p className="message">
        <h3>step {step}</h3>
        {children}
      </p>
    </>
  );
};

export default StepsApp;
