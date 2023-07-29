import Friend from "./Friend";

const FriendList = ({ friends, selectedFriend, currentSelection }) => {
  return (
    <>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          currentSelection={currentSelection}
        />
      ))}
    </>
  );
};

export default FriendList;
