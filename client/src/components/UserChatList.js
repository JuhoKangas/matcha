import { useDispatch } from 'react-redux'
import { selectOneChat, setChats } from '../reducers/chatReducer'
import { useSelector } from 'react-redux'

import moment from 'moment'
import { useEffect } from 'react'
import store from '../store'

const UserChatList = ({ socket }) => {
  //console.log("In online users ", onlineUsers)
  const loggedUser = useSelector(({ user }) => user)
  const chats = useSelector(({ chats }) => chats)
  const selectedChat = chats.selectedChat
  const dispatch = useDispatch()
  const openChat = (openedChatId) => {
    dispatch(selectOneChat(openedChatId))
    selectedChat &&
      socket.emit('clear-unread-messages', {
        chat: selectedChat.id,
        user1: Number(selectedChat.matcher_user_id),
        user2: Number(selectedChat.recipient_user_id),
      })
    console.log('This is info about selected chat: ', openedChatId)
  }

  const getLastMessage = (chat) => {
    if (chat.last_message_text !== '') {
      return (
        <div className='flex justify-between'>
          <div className='text-gray-light text-sm'>
            {chat.last_message_text && chat.last_message_text.length > 20 ? (
              <p>{chat.last_message_text.substring(0, 20)}...</p>
            ) : (
              chat.last_message_text
            )}
          </div>
          <div className='text-gray-light text-sm'>
            {chat.last_message_text &&
              moment(chat.updated_at).format('hh:mm a')}
          </div>
        </div>
      )
    } else return ''
  }

  const getUnreadMessages = (chat) => {
    if (chat.unread_messages && chat.last_message_sender !== loggedUser.id) {
      return (
        <div className='bg-bang-bang text-almost-black text-xs rounded-full h-5 w-5 flex items-center justify-center'>
          {chat.unread_messages}
        </div>
      )
    }
  }

  const isSelected = (chatId) => {
    if (selectedChat && selectedChat.id === chatId) return true
    else return false
  }

  useEffect(() => {
    socket.on('receive-message', (message) => {
      console.log('amedeo was here', message)
      const tempSelectedChat = store.getState().chats.selectedChat
      let tempAllChats = store.getState().chats.allChats
      if (tempSelectedChat?.id !== message.chat) {
        const updatedAllChats = tempAllChats.map((chat) => {
          if (chat.id === message.chat) {
            return {
              ...chat,
              unread_messages: chat?.unread_messages + 1,
              last_message_text: message.text,
            }
          }
          return chat
        })
        tempAllChats = updatedAllChats
      }

      // order chats according to the latest message
      const latestChat = tempAllChats.find((chat) => chat.id === message.chat)
      const otherChats = tempAllChats.filter((chat) => chat.id !== message.chat)
      tempAllChats = [latestChat, ...otherChats]
      dispatch(setChats(tempAllChats))
      console.log('UP{DATED CHATS', store.getState().chats.allChats)
    })
  }, []) // eslint-disable-line

  return (
    <div className='flex flex-col gap-3 w-96 '>
      {chats.allChats &&
        chats.allChats.map((chat) => {
          return (
            <div
              className={`bg-almost-white rounded-2xl p-5 cursor-pointer ${
                isSelected(chat.id) && 'ring-chitty-chitty ring-4'
              }`}
              key={chat.id}
              onClick={() => openChat(chat.id)}
            >
              <div className='flex gap-5 items-center'>
                <div className='relative'>
                  <img
                    src={require(`../assets/img/${
                      loggedUser.id === Number(chat.recipient_user_id)
                        ? chat.matcher_user_img
                        : chat.recipient_user_img
                    }`)}
                    alt='profile-pic'
                    className='w-12 h-10 rounded-full'
                  />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                  <div className='flex flex-row justify-between'>
                    <h1 className=''>
                      {loggedUser.id === Number(chat.recipient_user_id)
                        ? chat.matcher_user_username
                        : chat.recipient_user_username}
                    </h1>
                    {getUnreadMessages(chat)}
                  </div>
                  {getLastMessage(chat)}
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default UserChatList
