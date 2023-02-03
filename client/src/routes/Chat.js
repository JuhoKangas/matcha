import { useEffect } from "react"
import { useSelector } from "react-redux"
import ChatArea from "../components/ChatArea"
import UserChatList from "../components/UserChatList"
import { useDispatch } from 'react-redux'
import { initializeChats } from "../reducers/chatReducer"

const Chat = () => {
  const user = useSelector(({ user }) => user)
	const chats = useSelector(({ chats }) => chats)
	const messages = useSelector(({ messages }) => messages)
	//console.log("These are users from Chat: ", users)
	//const selectedChat = useSelector(state => state.chatReducer)
	//console.log("This is selected chat from Chat",selectedChat)

	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(initializeChats(user.id))
  }, [dispatch])

  console.log("chat user is: ", user)
	//console.log("chat users: ", users)
	console.log("chat: ", chats.selectedChat)

  return (
    <div className="h-screen w-screen">
			<div className="flex p-10 gap-5">
				<div className="w-96">
					<UserChatList loggedUser={user}  chats={chats.allChats} />
				</div>
				<div className="w-full">
					{chats.selectedChat && <ChatArea loggedUser={user} selectedChat={chats.selectedChat}/>}
					{/* <ChatArea loggedUser={user} messages={messages}/> */}
				</div>
			</div>
    </div>
  )
}

export default Chat