const Friend = ({ friend, selectedFriend, currentSelection }) => {
  const isSelected = currentSelection?.id == friend?.id;
  const handleSelect = () => {
    selectedFriend(friend);
  };

  return (
    <>
      <li className={isSelected ? "selected" : ""}>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>

        {friend.balance < 0 && (
          <p className="red">
            You owe {friend.name} ${Math.abs(friend.balance)}
          </p>
        )}
        {friend.balance > 0 && (
          <p className="green">
            Your friend {friend.name} owes you ${Math.abs(friend.balance)}
          </p>
        )}
        {friend.balance == 0 && (
          <p>You and your friend {friend.name} are even</p>
        )}
        <button className="button" onClick={handleSelect}>
          {isSelected ? "Close" : "Select"}
        </button>
      </li>
    </>
  );
};

export default Friend;
