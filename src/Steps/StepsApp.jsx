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

          <p className="message">
            step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              style={{ color: "#fff", background: "#7950f2" }}
              className="previous"
              onClick={handleRest}
            >
              Previous
            </button>
            <button
              style={{ color: "#fff", background: "#7950f2" }}
              className="next"
              onClick={handleAdd}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default StepsApp;
