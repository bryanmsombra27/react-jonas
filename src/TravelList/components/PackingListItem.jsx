const PackingListItem = ({ data, setInitialItems }) => {
  const handleChecked = (id) => {
    setInitialItems((prevState) =>
      // prevState.map((item) => {
      //   if (item.id == id) {
      //     item.packed = !item.packed;
      //     return item;
      //   } else {
      //     return item;
      //   }
      // })
      prevState.map((item) =>
        item.id == id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleDelete = (id) => {
    setInitialItems((prevState) => prevState.filter((item) => item.id !== id));
  };

  return (
    <>
      <li key={data.id}>
        <input
          type="checkbox"
          name=""
          id=""
          value={data.packed}
          checked={data.packed}
          onChange={() => handleChecked(data.id)}
        />
        <span style={data.packed ? { textDecoration: "line-through" } : {}}>
          {data.quantity} {data.description}
        </span>
        <button onClick={() => handleDelete(data.id)}>❌</button>
      </li>
    </>
  );
};

export default PackingListItem;
