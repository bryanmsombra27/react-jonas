const Stats = ({ initialItems }) => {
  if (!initialItems.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚌</em>
      </p>
    );

  const numItems = initialItems.length;
  const numPacked = initialItems.filter((item) => item.packed == true).length;
  const percentage = (numPacked * 100) / numItems;

  return (
    <>
      <footer className="stats">
        <em>
          {percentage == 100
            ? "You got everything! Ready to go ✈"
            : `    💼 You have ${numItems} items on your list and you already packed
            ${numPacked}(${percentage}%)`}
        </em>
      </footer>
    </>
  );
};

export default Stats;
