import { useDispatch } from 'react-redux'
import { selectOneChat } from '../reducers/chatReducer'
import { useSelector } from "react-redux"
import { getAllMessages } from '../reducers/messageReducer'
import moment from 'moment'

const UserChatList = () => {
	const loggedUser = useSelector(({ user }) => user)
	const chats = useSelector(({ chats }) => chats)
	const selectedChat = chats.selectedChat
  const dispatch = useDispatch()
  const openChat = (openedChatId) => {
    //const chat = chats.find((chat) => chat.recipient === recipientUser.id) --> when we have a table in db with all the messages
    dispatch(selectOneChat(openedChatId))
		//dispatch(getAllMessages(openedChatId))
    console.log('This is info about selected chat: ', openedChatId)
  }

  const getLastMessage = (chat) => {
		if (chat.last_message_text !== '') {
			return (
				<div className='flex justify-between'>
					<div className='text-gray-light text-sm'>
						{(chat.last_message_text).length > 20 ? <p>{(chat.last_message_text).substring(0,20)}...</p> : chat.last_message_text}
					</div>
					<div className='text-gray-light text-sm'>
						{moment(chat.updated_at).format('hh:mm a')}
					</div>
				</div>

			)
		}
		else
			return ''
  }

  const getUnreadMessages = (recipientUser) => {
    /* 			const chat = chats.find((chat) => chat.recipient === recipientUser.id) --> when we have a table in db with all the messages
			if (chat && chat.unreadMessages && chat.lastMessage.sender !== loggedUser.id) {
				return (
					<div className="bg-bang-bang text-almost-black text-xs rounded-full p-1">
						{chat.unreadMessages}
					</div>
				)
			} */
  }

	const isSelected = (chatId) => {
		if (selectedChat && selectedChat.id === chatId) 
			return true
		else
			return false
	}

  return (
    <div className='flex flex-col gap-3 w-96 '>
      {chats.allChats && chats.allChats.map((chat) => {
        return (
          <div
            className={`bg-almost-white rounded-2xl p-5 cursor-pointer ${isSelected(chat.id) && 'ring-chitty-chitty ring-4'}`}
            key={chat.id}
            onClick={() => openChat(chat.id)}
            //onClick={() => console.log(chat.id)}
          >
            <div className='flex gap-5 items-center'>
              <img
                src={require(`../assets/img/${loggedUser.id == chat.recipient_user_id ? chat.matcher_user_img : chat.recipient_user_img}`)}
                alt='profile-pic'
                className='w-10 h-10 rounded-full'
              />
              <div className='flex flex-col gap-1 w-full'>
                <div className='flex flex-col justify-between'>
                  <h1 className=''>{loggedUser.id == chat.recipient_user_id ? chat.matcher_user_username : chat.recipient_user_username}</h1>
                  {getUnreadMessages(chat)}
                </div>
                <p >{getLastMessage(chat)}</p>
              </div>
            </div>
          </div>
				)
      })}
    </div>
  )
}

export default UserChatList
