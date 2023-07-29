import { useState } from "react";

const FormSplitBill = ({ friend, handleSplitBill }) => {
  const [form, setForm] = useState({
    bill: 0,
    paidByUser: 0,
    whoIsPaying: "user",
  });
  const paidByFriend = +form.bill - +form.paidByUser;
  const handleInputChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.bill || !form.paidByUser) {
      return;
    }
    handleSplitBill(
      form.whoIsPaying == "user" ? paidByFriend : -form.paidByUser
    );
  };
  return (
    <>
      <form className="form-split-bill" onSubmit={handleSubmit}>
        <h2>Split a bill with {friend.name}</h2>
        <label htmlFor="">💰 Bill value</label>
        <input
          type="text"
          name="bill"
          onChange={handleInputChange}
          value={form.bill}
        />
        <label htmlFor="">💰 Your expense</label>
        <input
          type="text"
          onChange={handleInputChange}
          name="paidByUser"
          value={form.paidByUser}
        />
        <label htmlFor="">💰 {friend.name}'s expense</label>
        <input type="text" disabled value={paidByFriend} />
        <label htmlFor="">💰 Who is paying the bill ?</label>
        <select
          name="whoIsPaying"
          id=""
          onChange={handleInputChange}
          value={form.whoIsPaying}
        >
          <option value="user">You</option>
          <option value="friend">{friend.name}</option>
        </select>
        <button className="button">Split bill</button>
      </form>
    </>
  );
};

export default FormSplitBill;
