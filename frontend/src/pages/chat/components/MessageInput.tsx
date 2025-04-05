import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { Send } from "lucide-react";
import { useState } from "react";

const MessageInput = () => {
	const [newMessage, setNewMessage] = useState("");
	const { user } = useUser();
	const { selectedUser, sendMessage } = useChatStore();

	const handleSend = () => {
		if (!selectedUser || !user || !newMessage) return;
		sendMessage(selectedUser.clerkId, user.id, newMessage.trim());
		setNewMessage("");
	};

	return (
		<div className='p-4 mt-auto border-t border-purple-800/30 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 shadow-lg shadow-purple-500/10'>
			<div className='flex gap-2'>
				<Input
					placeholder='Type a message'
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					className='bg-indigo-800/40 border-purple-600/50 text-blue-100 focus-visible:ring-purple-500'
					onKeyDown={(e) => e.key === "Enter" && handleSend()}
				/>

				<Button 
					size={"icon"} 
					onClick={handleSend} 
					disabled={!newMessage.trim()}
					className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg shadow-purple-500/50 hover:shadow-indigo-500/60 transition-all duration-300 hover:scale-105'
				>
					<Send className='size-4' />
				</Button>
			</div>
		</div>
	);
};
export default MessageInput;
