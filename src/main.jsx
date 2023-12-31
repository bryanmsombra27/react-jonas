import React from "react";
import ReactDOM from "react-dom/client";
import CompoundComponent from "./ReactPatterns/CompoundComponent";
// import ReactQuizApp from "./ReactQuiz/ReactQuizApp";
// import BankAccountApp from "./BankAccount/BankAccount";
// import WorldWiseApp from "./WorldWise/WorldWiseApp";

// import App from "./FastReactPizzaCo/App";
import App from "./wideOasis/App";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./wideOasis/ui/ErrorFallback";
// import App from "./ShadowBank/App";
// import App from "./ReactPatterns/RenderProps";
// import App from "./ReduxIntroduction/App";
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
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace("/")}>

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
      {/* <ReactQuizApp /> */}
      {/* <BankAccountApp/>  */}
      {/* <WorldWiseApp /> */}
      {/* <App /> */}
      {/* <App /> */}
      {/* <App /> */}
      {/* <App /> */}
      {/* <App /> */}
      <App />

      {/* <CompoundComponent /> */}
    </ErrorBoundary>

  </React.StrictMode>
);
