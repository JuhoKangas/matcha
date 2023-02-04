import { useDispatch } from 'react-redux'
import { selectOneChat } from '../reducers/chatReducer'

const UserChatList = ({ loggedUser,  chats, selectedChat }) => {
  const dispatch = useDispatch()
  const openChat = (openedChatId) => {
    //const chat = chats.find((chat) => chat.recipient === recipientUser.id) --> when we have a table in db with all the messages
    dispatch(selectOneChat(openedChatId))
    console.log('This is info about selected chat: ', openedChatId)
  }

  const getLastMessage = (recipientUser) => {
    //const chat = chats.find((chat) => chat.recipient === recipientUser.id) --> when we have a table in db with all the messages
    // return chat.lastMessage
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
      {chats && chats.map((chat) => {
        return (
          <div
            className={`bg-almost-white rounded-2xl p-5 cursor-pointer ${isSelected(chat.id) && 'ring-chitty-chitty ring-4'}`}
            key={chat.id}
            onClick={() => openChat(chat.id)}
          >
            <div className='flex gap-5 items-center'>
              <img
                src={require(`../assets/img/${chat.recipient_user_img}`)}
                alt='profile-pic'
                className='w-10 h-10 rounded-full'
              />
              <div className='flex flex-col gap-1'>
                <div className='flex flex-col justify-between'>
                  <h1 className=''>{chat.recipient_user_username}</h1>
                  {getUnreadMessages(chat)}
                </div>
                <p className='text-gray-500 text-sm'>{getLastMessage(chat)}</p>
              </div>
            </div>
          </div>
				)
      })}
    </div>
  )
}

export default UserChatList
