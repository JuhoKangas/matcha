import { useEffect } from "react"
import { useSelector } from "react-redux"
import ChatArea from "../components/ChatArea"
import UserChatList from "../components/UserChatList"
import { useDispatch } from 'react-redux'
import { initializeChats } from "../reducers/chatReducer"
import { getAllMessages } from "../reducers/messageReducer"

const Chat = () => {
  const user = useSelector(({ user }) => user)
	const chats = useSelector(({ chats }) => chats)
	console.log("These are users from Chat: ", user)
	const selectedChat = chats.selectedChat

	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(initializeChats(user.id))
  }, [user, dispatch])

	useEffect(() => {
		selectedChat && dispatch(getAllMessages(selectedChat.id))
  }, [selectedChat, dispatch])

  console.log("chat user is: ", user)
	//console.log("chat users: ", users)
	console.log("chat: ", selectedChat)

  return (
    <div className="h-screen w-screen">
			<div className="flex p-10 gap-5">
				<div className="w-96">
					<UserChatList />
				</div>
				<div className="w-full">
					{chats.selectedChat && <ChatArea />}
					{/* <ChatArea loggedUser={user} messages={messages}/> */}
				</div>
			</div>
    </div>
  )
}

export default Chat