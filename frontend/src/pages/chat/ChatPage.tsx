import Topbar from "@/components/Topbar";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import UsersList from "./components/UsersList";
import ChatHeader from "./components/ChatHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import MessageInput from "./components/MessageInput";

const formatTime = (date: string) => {
	return new Date(date).toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
};

const ChatPage = () => {
	const { user } = useUser();
	const { messages, selectedUser, fetchUsers, fetchMessages } = useChatStore();

	useEffect(() => {
		if (user) fetchUsers();
	}, [fetchUsers, user]);

	useEffect(() => {
		if (selectedUser) fetchMessages(selectedUser.clerkId);
	}, [selectedUser, fetchMessages]);

	console.log({ messages });

	return (
		<main className='h-full rounded-lg bg-gradient-to-b from-indigo-950 via-purple-950 to-black overflow-hidden shadow-xl shadow-purple-500/10'>
			<Topbar />

			<div className='grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]'>
				<UsersList />

				{/* chat message */}
				<div className='flex flex-col h-full bg-gradient-to-b from-indigo-900/40 to-purple-900/40'>
					{selectedUser ? (
						<>
							<ChatHeader />

							{/* Messages */}
							<ScrollArea className='h-[calc(100vh-340px)]'>
								<div className='p-4 space-y-4'>
									{messages.map((message) => (
										<div
											key={message._id}
											className={`flex items-start gap-3 ${message.senderId === user?.id ? "flex-row-reverse" : ""}`}
										>
											<Avatar className='size-8 border border-purple-500/30 shadow-sm'>
												<AvatarImage
													src={
														message.senderId === user?.id
															? user.imageUrl
															: selectedUser.imageUrl
													}
												/>
												<AvatarFallback>
													{message.senderId === user?.id
														? user.fullName?.[0] || "U"
														: selectedUser.fullName[0]}
												</AvatarFallback>
											</Avatar>

											<div
												className={`rounded-lg p-3 max-w-[70%] shadow-md ${message.senderId === user?.id 
													? "bg-gradient-to-r from-purple-600 to-indigo-600 shadow-purple-500/20" 
													: "bg-gradient-to-r from-indigo-900/80 to-purple-900/80 border border-purple-800/30 shadow-purple-500/10"}`}
											>
												<p className='text-sm text-blue-100'>{message.content}</p>
												<span className='text-xs text-blue-200/70 mt-1 block'>
													{formatTime(message.createdAt)}
												</span>
											</div>
										</div>
									))}
								</div>
							</ScrollArea>

							<MessageInput />
						</>
					) : (
						<NoConversationPlaceholder />
					)}
				</div>
			</div>
		</main>
	);
};
export default ChatPage;

const NoConversationPlaceholder = () => (
	<div className='flex flex-col items-center justify-center h-full space-y-6'>
		<div className='relative'>
			<div className='absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-lg opacity-75'></div>
			<img src='/spotify.png' alt='Spotify' className='size-16 animate-bounce relative z-10' />
		</div>
		<div className='text-center'>
			<h3 className='text-lg font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text mb-1'>No conversation selected</h3>
			<p className='text-purple-300/80 text-sm'>Choose a friend to start chatting</p>
		</div>
	</div>
);
