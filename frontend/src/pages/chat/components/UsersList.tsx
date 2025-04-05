import UsersListSkeleton from "@/components/skeletons/UsersListSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";

const UsersList = () => {
	const { users, selectedUser, isLoading, setSelectedUser, onlineUsers } = useChatStore();

	return (
		<div className='border-r border-purple-800/30 bg-gradient-to-b from-indigo-900/80 to-purple-900/80 shadow-lg shadow-purple-500/10'>
			<div className='flex flex-col h-full'>
				<div className='p-4 flex justify-between items-center border-b border-purple-800/30 bg-gradient-to-r from-purple-900/20 to-indigo-900/10'>
					<h3 className='text-lg font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text'>Contacts</h3>
				</div>
				<ScrollArea className='h-[calc(100vh-320px)]'>
					<div className='space-y-2 p-4'>
						{isLoading ? (
							<UsersListSkeleton />
						) : (
							users.map((user) => (
								<div
									key={user._id}
									onClick={() => setSelectedUser(user)}
									className={`flex items-center justify-center lg:justify-start gap-3 p-3 
										rounded-lg cursor-pointer transition-all duration-300
                    ${selectedUser?.clerkId === user.clerkId 
										? "bg-gradient-to-r from-purple-900/40 to-indigo-900/40 shadow-md shadow-purple-500/10" 
										: "hover:bg-gradient-to-r hover:from-purple-900/20 hover:to-indigo-900/10 hover:shadow-md"}`}
								>
									<div className='relative'>
										<Avatar className='size-8 md:size-12 border border-purple-500/30'>
											<AvatarImage src={user.imageUrl} />
											<AvatarFallback>{user.fullName[0]}</AvatarFallback>
										</Avatar>
										{/* online indicator */}
										<div
											className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-indigo-900
                        ${onlineUsers.has(user.clerkId) 
												? "bg-green-500 shadow-sm shadow-green-500/50" 
												: "bg-zinc-500"}`}
										/>
									</div>

									<div className='flex-1 min-w-0 lg:block hidden'>
										<span className='font-medium truncate text-blue-100 drop-shadow-[0_0_3px_rgba(168,85,247,0.3)]'>{user.fullName}</span>
									</div>
								</div>
							))
						)}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};

export default UsersList;
