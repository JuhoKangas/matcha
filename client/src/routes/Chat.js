import usersService from "../services/users"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ChatArea from "../components/ChatArea"
import UserChatList from "../components/UserChatList"

const Chat = (props) => {
  const user = useSelector(({ user }) => user)
	const users = useSelector(({ users }) => users)

  console.log("chat user is: ", user)
	console.log("chat users: ", users)

  return (
    <div className="h-screen w-screen">
			<div className="flex p-10 gap-5">
				<div className="w-96">
					<UserChatList users={users} />
				</div>
				<div>
					<ChatArea />
				</div>
			</div>
    </div>
  )
}

export default Chat
