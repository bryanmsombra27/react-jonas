import { useState } from "react";

const Form = ({ initialItems, setInitialItems }) => {
  const [form, setForm] = useState({
    description: "",
    quantity: 0,
  });

  const submit = (e) => {
    e.preventDefault();

    if (form.description == "" || form.quantity == 0) {
      return;
    }

    const newItem = {
      id: Date.now(),
      description: form.description,
      quantity: form.quantity,
      packed: false,
    };
    console.log(form);
    console.log(newItem);
    setInitialItems((prevState) => [...prevState, newItem]);
  };

  const handleInputChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      // [e.target.name]: e.target.value,
      [e.target.name]:
        e.target.name == "quantity" ? +e.target.value : e.target.value,
    }));
  };

  return (
    <>
      <form className="add-form" onSubmit={submit}>
        <h3>What do you need for your 😍 trip ?</h3>
        <select
          name="quantity"
          id=""
          onChange={handleInputChange}
          value={form.quantity}
        >
          {/* {Array.from(20).map((_, index) => (
            <option value={index}>{index}</option>
          ))} */}
          {Array.from({ length: 20 }, (_, index) => (
            <option value={index + 1}>{index + 1}</option>
          ))}
        </select>
        <input
          type="text"
          name="description"
          placeholder="What do you want"
          onChange={handleInputChange}
          value={form.description}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default Form;
