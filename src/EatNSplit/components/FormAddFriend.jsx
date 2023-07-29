import { useState } from "react";

const FormAddFriend = ({ setFriends }) => {
  const [form, setForm] = useState({
    name: "",
    image: "https://i.pravatar.cc/48",
  });

  const handleInputChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const submit = (e) => {
    e.preventDefault();

    if (!form.name || !form.image) {
      return;
    }

    const id = crypto.randomUUID();

    const newFriend = {
      name: form.name,
      image: `${form.image}?u=${id}`,
      balance: 0,
      id,
    };
    setForm({
      name: "",
      image: "https://i.pravatar.cc/48",
    });
    setFriends(newFriend);
  };

  return (
    <form className="form-add-friend" onSubmit={submit}>
      <label htmlFor="">👫 Friend name</label>
      <input
        type="text"
        name="name"
        onChange={handleInputChange}
        value={form.name}
      />
      <label htmlFor="">🖼 Image URL</label>
      <input
        type="text"
        name="image"
        onChange={handleInputChange}
        value={form.image}
      />

      <button className="button">Select</button>
    </form>
  );
};

export default FormAddFriend;
