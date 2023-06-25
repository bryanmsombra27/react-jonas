import { useState } from "react";
import PackingListItem from "./PackingListItem";

const PackingList = ({ initialItems, setInitialItems }) => {
  const [sortBy, setSortBy] = useState("input");
  let sortArray;
  if (sortBy === "input") sortArray = initialItems;

  if (sortBy === "description")
    sortArray = initialItems
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortArray = initialItems
      .slice()
      .sort((a, b) => Number(a.packed) - +b.packed);

  const handleSelect = (e) => {
    setSortBy(e.target.value);
  };
  const handleButton = () => {
    setInitialItems([]);
  };
  return (
    <>
      <div className="list">
        <ul>
          {sortArray.map((item) => (
            <PackingListItem data={item} setInitialItems={setInitialItems} />
          ))}
        </ul>

        <div className="actions">
          <select name="sort" id="" onChange={handleSelect} value={sortBy}>
            <option value="input">Sort by input order</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed status</option>
          </select>
        </div>

        <button onClick={handleButton}>Clear list</button>
      </div>
    </>
  );
};

export default PackingList;
