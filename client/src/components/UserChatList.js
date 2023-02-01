import { useDispatch } from 'react-redux'
import { selectOneChat } from '../reducers/chatReducer'

const UserChatList = ({ loggedUser, users, chats }) => {
  const dispatch = useDispatch()
  const openChat = (recipientUser) => {
    //const chat = chats.find((chat) => chat.recipient === recipientUser.id) --> when we have a table in db with all the messages
    //dispatch(selectOneChat(chat)) --> when we have the backend responsible for getting this data from db
    console.log('This is recipient id: ', recipientUser)
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

  return (
    <div className='flex flex-col gap-3 w-96 '>
      {users.map((user) => {
        return loggedUser.username !== user.username ? (
          <div
            className='bg-almost-white ring-chitty-chitty rounded-2xl p-5 ring-4'
            key={user.id}
            onClick={() => openChat(user)}
          >
            <div className='flex gap-5 items-center'>
              <img
                src='./dog.png'
                alt='profile-pic'
                className='w-10 h-10 rounded-full'
              />
              <div className='flex flex-col gap-1'>
                <div className='flex flex-col justify-between'>
                  <h1 className=''>{user.username}</h1>
                  {getUnreadMessages(user)}
                </div>
                <p className='text-gray-500 text-sm'>{getLastMessage(user)}</p>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )
      })}
    </div>
  )
}

export default UserChatList
