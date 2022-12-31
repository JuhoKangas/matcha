import { useDispatch } from "react-redux";
import { selectOneChat } from "../reducers/chatReducer";

const UserChatList = ({ loggedUser, users, chats }) => {
	const dispatch = useDispatch()
  const openChat = (recipientUser) => {
		//const chat = chats.find((chat) => chat.recipient === recipientUser.id) --> when we have a table in db with all the messages
		//dispatch(selectOneChat(chat)) --> when we have the backend responsible for getting this data from db
		console.log("This is recipient id: ", recipientUser)
		
	};

  return (
    <div className="flex flex-col gap-3">
      {users.data.rows.map((user) => {
        return loggedUser.username !== user.username ? (
          <div
            className="bg-light-gray border-chitty-chitty border-solid border-5 border rounded-2xl p-5"
            key={user.id}
            onClick={() => openChat(user)}
          >
            <div className="flex gap-5 items-center">
              <img
                src="./dog.png"
                alt="profile-pic"
                className="w-10 h-10 rounded-full"
              />
              <h1 className="">{user.username}</h1>
            </div>
          </div>
        ) : (
          <></>
        );
      })}
    </div>
  );
};

export default UserChatList;
