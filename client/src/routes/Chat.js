import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ChatArea from '../components/ChatArea'
import UserChatList from '../components/UserChatList'
import { useDispatch } from 'react-redux'
import {
  initializeChats,
  updateUnreadMessagesToRead,
} from '../reducers/chatReducer'

const Chat = ({ socket }) => {
  const user = useSelector(({ user }) => user)
  const chats = useSelector(({ chats }) => chats)
  const selectedChat = chats.selectedChat
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeChats(user.id))
  }, [user, dispatch])

  useEffect(() => {
    if (
      selectedChat &&
      selectedChat.last_message_sender &&
      selectedChat.last_message_sender !== user.id
    ) {
      dispatch(updateUnreadMessagesToRead(selectedChat.id))
    }
  }, [selectedChat, dispatch, user])

  return (
    <div className="h-screen w-screen">
      <div className="flex p-10 gap-5">
        <div className="w-96">
          <UserChatList socket={socket} />
        </div>
        <div className="w-full">
          {chats.selectedChat && <ChatArea socket={socket} />}
        </div>
      </div>
    </div>
  )
}

export default Chat
