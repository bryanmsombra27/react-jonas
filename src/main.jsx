import React from "react";
import ReactDOM from "react-dom/client";
// import PizzaApp from "./PizzaMenu/PizzaApp.jsx";
import StepsApp from "./Steps/StepsApp";
import DateCounter from "./Steps/dateCounter.jsx";
import TravelListApp from "./TravelList/TravelListApp.jsx";
import Accordion from "./components/Accordion.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <PizzaApp /> */}
    <StepsApp />
    {/* <DateCounter /> */}
    {/* <TravelListApp /> */}
    {/* {<Accordion />} */}
  </React.StrictMode>
);
