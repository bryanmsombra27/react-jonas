import { useState } from "react";
import Form from "./components/Form";
import Logo from "./components/Logo";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
import "./index.css";
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Passports", quantity: 2, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
// ];

const TravelListApp = () => {
  const [initialItems, setInitialItems] = useState([]);
  return (
    <>
      <div className="app">
        <Logo />
        <Form initialItems={initialItems} setInitialItems={setInitialItems} />
        <PackingList
          initialItems={initialItems}
          setInitialItems={setInitialItems}
        />
        <Stats initialItems={initialItems} />
      </div>
    </>
  );
};

export default TravelListApp;
