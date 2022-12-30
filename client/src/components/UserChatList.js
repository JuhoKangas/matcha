const UserChatList = ({ users }) => {
	return (
		<div className="flex flex-col gap-3">
			{users.data.rows.map((user) => {
				return (
				<div className="bg-light-gray border-chitty-chitty border-solid border-5 border rounded-2xl p-5">
					<div className="flex gap-5 items-center">
						<img src="./dog.png" alt="profile-pic" className="w-10 h-10 rounded-full"/>
						<h1 className="">
							{user.username}
						</h1>
					</div>
					</div>
				)
			})}
		</div>
	)
} 

export default UserChatList