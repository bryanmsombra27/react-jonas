import React from "react";
import ReactDOM from "react-dom/client";
import ReactQuizApp from "./ReactQuiz/ReactQuizApp";
import { ReactQuizContextProvider } from "./ReactQuiz/context/ReactQuizContext";
// import BankAccountApp from "./BankAccount/BankAccount";
// import WorldWiseApp from "./WorldWise/WorldWiseApp";

// import App from "./AtomicBlog/App";
// import PizzaApp from "./PizzaMenu/PizzaApp.jsx";
// import StepsApp from "./Steps/StepsApp";
// import DateCounter from "./Steps/dateCounter.jsx";
// import TravelListApp from "./TravelList/TravelListApp.jsx";
// import Accordion from "./components/Accordion.jsx";
// import TipCalculator from "./tipCalculator/TipCalculatorApp.jsx";
// import EatNSplintApp from "./EatNSplit/EatNSplitApp.jsx";
// import PopcornApp from "./usePopCorn/PopcornApp.jsx";
// import CurrencyConverterApp from "./components/CurrencyConverter.jsx";
// import TextExpander from "./components/TextExpander.jsx";
// import App from "./HowItWorks/App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <PizzaApp /> */}
    {/* <StepsApp /> */}
    {/* <DateCounter /> */}
    {/* <TravelListApp /> */}
    {/* {<Accordion />} */}
    {/* <TipCalculator /> */}
    {/* <EatNSplintApp /> */}
    {/* <PopcornApp /> */}
    {/* <TextExpander>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae odio
      exercitationem ea! Commodi, saepe similique fuga consequatur sint officia,
      hic voluptatum laborum harum sunt earum tempora totam, aperiam id ipsam?
    </TextExpander> */}

    {/* <CurrencyConverterApp /> */}
    <ReactQuizContextProvider>
      <ReactQuizApp />
    </ReactQuizContextProvider>
    {/* <BankAccountApp/>  */}
    {/* <WorldWiseApp /> */}

    {/* <App /> */}

    {/* <App /> */}
  </React.StrictMode>
);
