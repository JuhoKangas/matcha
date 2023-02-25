import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import { messageSend } from '../reducers/messageReducer'
import { setChats } from '../reducers/chatReducer'
import messageService from '../services/messages'
import store from '../store'
import moment from 'moment'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const ChatArea = ({ socket }) => {
  const loggedUser = useSelector(({ user }) => user)
  const selectedChat = useSelector(({ chats }) => chats.selectedChat)
  const dispatch = useDispatch()

  const [newMessage, setNewMessage] = useState('')
  const [messages = [], setMessages] = useState([])

  const [recipient, setRecipient] = useState('')

  useEffect(() => {
    loggedUser.id === Number(selectedChat.recipient_user_id)
      ? setRecipient(selectedChat.matcher_user_username)
      : setRecipient(selectedChat.recipient_user_username)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const usernamePath = `/${recipient}`

  const sendNewMessage = (e) => {
    e.preventDefault()
    const loggedUserId = loggedUser.id
    const chatId = selectedChat.id

    const message = {
      text: newMessage,
      sender: loggedUserId,
      chat: chatId,
    }

    // send message to server using socket
    if (message.text !== '') {
      socket.emit('send-message', {
        ...message,
        user1: Number(selectedChat.matcher_user_id),
        user2: Number(selectedChat.recipient_user_id),
        read: 0,
      })

      socket.emit('notification', {
        user1: loggedUser.id,
        user2:
          loggedUser.id === Number(selectedChat.matcher_user_id)
            ? Number(selectedChat.recipient_user_id)
            : Number(selectedChat.matcher_user_id),
        content: `${selectedChat.recipient_user_username} sent you a message.`,
        type: 2,
        category: `message`,
      })

      // store message in db
      dispatch(messageSend(message))
      setNewMessage('')
    } else toast.error('Cannot send an empty message')
  }

  const getMessages = async () => {
    try {
      const response = await messageService.getChatMessages(selectedChat.id)
      if (response.status === 200) setMessages(response.data.messages)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMessages()
    //receive message from server using socket
    socket.off('receive-message').on('receive-message', (message) => {
      const tempSelectedChat = store.getState().chats.selectedChat
      if (tempSelectedChat?.id === message.chat)
        setMessages((messages) => [...messages, message])
    })

    socket.on('unread-messages-cleared', (data) => {
      const tempAllChats = store.getState().chats.allChats
      const tempSelectedChat = store.getState().chats.selectedChat

      if (data.chat === tempSelectedChat?.id) {
        const updatedChats = tempAllChats.map((chat) => {
          if (chat.id === data.chat) {
            return {
              ...chat,
              unread_messages: 0,
            }
          }
          return {
            chat,
          }
        })
        dispatch(setChats(updatedChats))

        setMessages((prevMessages) => {
          return prevMessages.map((message) => {
            return {
              ...message,
              read: 1,
            }
          })
        })
      }
    })
  }, [selectedChat]) // eslint-disable-line

  useEffect(() => {
    const messagesContainer = document.getElementById('messages')
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }, [messages])

  return (
    <>
      <div className='flex flex-col justify-between bg-white border rounded-2xl h-[85vh] p-5'>
        <div>
          <div className='flex gap-5 items-center mb-2'>
            <img
              src={`http://localhost:3001/uploads/${
                loggedUser.id === Number(selectedChat.recipient_user_id)
                  ? selectedChat.matcher_user_img
                  : selectedChat.recipient_user_img
              }`}
              alt='profile-pic'
              className='w-10 h-10 rounded-full'
            />
            <Link to={usernamePath}>
              <h1 className='uppercase'>
                {loggedUser.id === Number(selectedChat.recipient_user_id)
                  ? selectedChat.matcher_user_username
                  : selectedChat.recipient_user_username}
              </h1>
            </Link>
          </div>
          <hr />
        </div>

        <div className='h-[70vh] overflow-y-scroll pr-5 pl-5' id='messages'>
          <div className='flex flex-col gap-2'>
            {messages !== undefined &&
              messages.map((message, index) => {
                return (
                  <div
                    key={index}
                    className={`flex ${
                      Number(message.sender) === loggedUser.id && 'justify-end'
                    }`}
                  >
                    <div className='flex flex-col gap-1'>
                      <div
                        className={`${
                          Number(message.sender) === loggedUser.id
                            ? 'bg-chitty-chitty text-almost-white rounded-bl-none'
                            : 'bg-almost-white text-chitty-chitty rounded-tr-none'
                        } p-3 rounded-xl max-w-xl`}
                      >
                        <p className='break-words'>{message.text}</p>
                      </div>
                      <div className='flex justify-end text-sm text-gray-light gap-2'>
                        {moment(message.created_at).format('hh:mm a')}
                        <i className='text-green-600'>
                          {Number(message.sender) === loggedUser.id &&
                          Number(message.read) === 1 ? (
                            <FontAwesomeIcon icon={faCheckDouble} />
                          ) : (
                            ''
                          )}
                        </i>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
        <div>
          <div className='border-gray-300 rounded-lg border bg-white flex justify-between'>
            <input
              type='text'
              placeholder='Write a message'
              className='w-[99%] h-full rounded-lg border-0 border-transparent focus:border-transparent focus:ring-0'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className='bg-gradient-to-r from-chitty-chitty to-bang-bang hover:bg-gradient-to-l text-almost-black py-2 px-6 rounded focus:outline-none focus:shadow-outline font-montserrat font-medium'
              onClick={sendNewMessage}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatArea
