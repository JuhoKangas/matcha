import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons"
import { updateUnreadMessagesToRead, setSelectedChat } from "../reducers/chatReducer"
import { messageSend, getAllMessages } from "../reducers/messageReducer"

const ChatArea = (loggedUser) => {
	const dispatch = useDispatch()
  //const {selectedChat} = useSelector(state => state.chatReducer) --> when backend is done
  // const recipient = selectedChat.recipient --> when backend is done

  const sendNewMessage = (event) => {
		event.preventDefault()
		const text = event.target.text.value
		const userId = loggedUser.id
		//const chatId = selectedChat.id --> when backend is done
/*     try {
      const message = {
        text: newMessage,
        sender: loggedUser.id,
        chat: selectedChat.id --> when backend is done
      }; */
      //dispatch(messageSend(text, userId, chatId));
      /* setNewMessage(""); */
/*     } catch (error) {
      console.log(error);
    } */
  };

/* 	const clearUnreadMessages = () => {
		const chatId = selectedChat.id --> when backend is done
		dispatch(updateUnreadMessagesToRead(chatId))
	} */

/* 	useEffect(() => {
		getAllMessages()
		if (selectedChat.lastMessage.sender !== loggedUser.id)
		{
			clearUnreadMessages()
		}
	}, [selectedChat]) --> all of this will be implemented once we have backend set up */

  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        />
      </head>
      <div className="flex flex-col justify-between bg-almost-white border rounded-2xl h-[85vh] p-5">
        <div>
          {/* 				<div className="flex gap-5 items-center mb-2">
              <img
                src="./dog.png"
                alt="profile-pic"
                className="w-10 h-10 rounded-full"
              />
              <h1 className="uppercase">{recipient.username}</h1>
          </div> --> when backend is done
					<hr />
*/}
          <div className="flex gap-5 items-center mb-2">
            <img
              src="./dog.png"
              alt="profile-pic"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="uppercase">RANDO</h1>
          </div>
          <hr />
        </div>

        <div className="h-[65vh] overflow-y-scroll">
					<div className="flex flex-col gap-2">
{/* 						{messages.map((message) => {
							return 
								<div className={`flex ${message.sender === loggedUser.id} && justify-end`}>
										<div className="flex flex-col gap-1">
											<h1 className={`${message.sender === loggedUser.id ? "bg-bang-bang" : "bg-almost-white"} p-2 rounded-xl`}>{message.text}</h1>
											<h1 className="text-sm">{message.createdAt}</h1>
											{message.sender === loggedUser.id && ${message.read ? <FontAwesomeIcon icon={faCheckDouble}/>} : ""}
										</div>
								</div>
							})} */}
					</div>
				</div>
        <div>
          <div className="border-gray-300 rounded-lg border bg-white flex justify-between">
            <input
              type="text"
              placeholder="Write a message"
              className="w-[99%] h-full rounded-lg border-0 border-transparent focus:border-transparent focus:ring-0"
							name="text"
/*               value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
              }} */
            />
            <button className="bg-gradient-to-r from-chitty-chitty to-bang-bang hover:bg-gradient-to-l text-almost-black py-2 px-6 rounded focus:outline-none focus:shadow-outline font-montserrat font-medium" onClick={sendNewMessage}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatArea;