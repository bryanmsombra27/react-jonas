import { useState } from "react";
import FormAddFriend from "./components/FormAddFriend";
import FormSplitBill from "./components/FormSplitBill";
import FriendList from "./components/FriendList";
import "./main.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const EatNSplintApp = () => {
  const [friends, setFriends] = useState([
    {
      id: 118836,
      name: "Clark",
      image: "https://i.pravatar.cc/48?u=118836",
      balance: -7,
    },
    {
      id: 933372,
      name: "Sarah",
      image: "https://i.pravatar.cc/48?u=933372",
      balance: 20,
    },
    {
      id: 499476,
      name: "Anthony",
      image: "https://i.pravatar.cc/48?u=499476",
      balance: 0,
    },
  ]);
  const [toggleAddForm, setToggleAddForm] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const showHideAddform = () => {
    setToggleAddForm((prevState) => !prevState);
  };
  const addNewFriend = (friend) => {
    setFriends((prevState) => [...prevState, friend]);
    setToggleAddForm((prevState) => !prevState);
  };

  const selectFriend = (friend) => {
    setSelectedFriend(friend);
  };
  const handleSplitBill = (value) => {
    setFriends((prev) =>
      prev.map((item) =>
        item.id == selectedFriend.id
          ? { ...item, balance: item.balance + value }
          : item
      )
    );
  };

  return (
    <>
      <div className="app">
        <div className="sidebar">
          <FriendList
            friends={friends}
            selectedFriend={selectFriend}
            currentSelection={selectedFriend}
          />
          {toggleAddForm && <FormAddFriend setFriends={addNewFriend} />}
          <button className="button" onClick={showHideAddform}>
            {toggleAddForm ? "Close" : "Add friend"}
          </button>
        </div>
        {selectedFriend && (
          <FormSplitBill
            friend={selectedFriend}
            handleSplitBill={handleSplitBill}
          />
        )}
      </div>
    </>
  );
};

export default EatNSplintApp;
