import { useEffect } from "react"
import { useSelector } from "react-redux"
import ChatArea from "../components/ChatArea"
import UserChatList from "../components/UserChatList"
import { useDispatch } from 'react-redux'
import { initializeUsers } from "../reducers/usersReducer"
import { initializeChats } from "../reducers/chatReducer"

const Chat = ({users}) => {
  const user = useSelector(({ user }) => user)
	//const users = useSelector(({ users }) => users)
	const chats = useSelector(({ chats }) => chats)
	const messages = useSelector(({ messages }) => messages)
	//console.log("These are users from Chat: ", users)
	//const {selectedChat} = useSelector(state => state.chatReducer)

	const dispatch = useDispatch()

  useEffect(() => {
		//dispatch(initializeUsers())
    dispatch(initializeChats(user.id))
  }, [dispatch])

  console.log("chat user is: ", user)
	//console.log("chat users: ", users)
	console.log("chat: ", chats)

  return (
    <div className="h-screen w-screen">
			<div className="flex p-10 gap-5">
				<div className="w-96">
					<UserChatList loggedUser={user}  chats={chats.allChats} />
				</div>
				<div className="w-full">
					{/* {selectedChat && <ChatArea loggedUser={user}/>} --> after we create the backend; it'll display the chat area only after a specific chat is selected */}
					<ChatArea loggedUser={user} messages={messages}/>
				</div>
			</div>
    </div>
  )
}

export default Chat