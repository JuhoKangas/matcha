import { useSelector } from "react-redux"

const ChatArea = (loggedUser) => {
	//const {selectedChat} = useSelector(state => state.chatReducer) --> when backend is done
	// const recipient = selectedChat.recipient --> when backend is done
	return (
		<div className="flex flex-col justify-between bg-light-gray border rounded-2xl h-[85vh] p-5">
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
			<div>
				messages
			</div>
			<div>
				<div className="border-gray-300 rounded-lg border bg-white flex justify-between ">
					<input type="text" placeholder="Write a message" className="w-[99%] h-full rounded-lg border-0 border-transparent focus:border-transparent focus:ring-0"/>
					<button className="bg-gradient-to-r from-chitty-chitty to-bang-bang hover:bg-gradient-to-l text-almost-black py-2 px-4 rounded focus:outline-none focus:shadow-outline font-montserrat font-medium">SEND</button>
				</div>
			</div>
		</div>
	)
} 

export default ChatArea