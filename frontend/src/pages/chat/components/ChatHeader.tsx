import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";

const ChatHeader = () => {
	const { selectedUser, onlineUsers } = useChatStore();

	if (!selectedUser) return null;

	return (
		<div className='p-4 border-b border-purple-800/30 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 shadow-md shadow-purple-500/10'>
			<div className='flex items-center gap-3'>
				<Avatar className='border border-purple-500/30 shadow-sm'>
					<AvatarImage src={selectedUser.imageUrl} />
					<AvatarFallback>{selectedUser.fullName[0]}</AvatarFallback>
				</Avatar>
				<div>
					<h2 className='font-medium text-blue-100 drop-shadow-[0_0_3px_rgba(168,85,247,0.3)]'>{selectedUser.fullName}</h2>
					<p className={`text-sm ${onlineUsers.has(selectedUser.clerkId) ? "text-green-400" : "text-purple-300/80"}`}>
						{onlineUsers.has(selectedUser.clerkId) ? "Online" : "Offline"}
					</p>
				</div>
			</div>
		</div>
	);
};
export default ChatHeader;
