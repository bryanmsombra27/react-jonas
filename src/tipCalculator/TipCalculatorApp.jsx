import { useState } from "react";

const rates = [
  {
    value: 0,
    label: "Disatisfied (0%)",
  },
  {
    value: 0.05,
    label: "It was okay (5%)",
  },
  {
    value: 0.1,
    label: "It was good (10%)",
  },
  {
    value: 0.2,
    label: "Absolutely amazing! (20%)",
  },
];

const TipCalculator = () => {
  const [initialState, setInitialState] = useState({
    bill: null,
    myServiceRate: null,
    friendsServiceRate: null,
  });

  const reset = () => {
    setInitialState({
      bill: null,
      myServiceRate: null,
      friendsServiceRate: null,
    });
  };
  const handleInputChange = (e) => {
    setInitialState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div>
        <BillComponent handler={handleInputChange} value={initialState.bill} />
        <RateService
          opts={rates}
          question="How did you like the service ?"
          handler={handleInputChange}
          inputName="myServiceRate"
          value={initialState.myServiceRate}
        />
        <RateService
          opts={rates}
          question="How did your friend like the service ?"
          handler={handleInputChange}
          inputName="friendsServiceRate"
          value={initialState.friendsServiceRate}
        />
        <Output reset={reset} values={initialState} />
      </div>
    </>
  );
};
const BillComponent = ({ value, handler }) => {
  return (
    <>
      <label htmlFor="">How much was the bill ?</label>
      <input type="number" name="bill" value={value} onChange={handler} />
    </>
  );
};
const RateService = ({ question, opts, value, handler, inputName }) => {
  return (
    <>
      <label htmlFor="">{question}</label>
      <select name={inputName} id="" value={value} onChange={handler}>
        {opts.map((item) => (
          <option value={item.value}>{item.label}</option>
        ))}
      </select>
    </>
  );
};
const Output = ({ reset, values }) => {
  const bill = values.bill;
  const totalTip = +values.myServiceRate + +values.friendsServiceRate;
  const totalBillTip = Math.round(bill * totalTip);

  return (
    <>
      {bill > 0 && (
        <>
          <h3>
            You pay ${bill} ({`$${bill} + $${totalBillTip} tip`})
          </h3>
        </>
      )}
      <button onClick={reset}>Reset</button>
    </>
  );
};

export default TipCalculator;
