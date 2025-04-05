import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/stores/useMusicStore";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface NewSong {
	title: string;
	artist: string;
	album: string;
}

const AddSongDialog = () => {
	const { albums } = useMusicStore();
	const [songDialogOpen, setSongDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [newSong, setNewSong] = useState<NewSong>({
		title: "",
		artist: "",
		album: "",
	});

	const [files, setFiles] = useState<{ audio: File | null; image: File | null }>({
		audio: null,
		image: null,
	});

	const audioInputRef = useRef<HTMLInputElement>(null);
	const imageInputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async () => {
		setIsLoading(true);

		try {
			if (!files.audio || !files.image) {
				return toast.error("Please upload both audio and image files");
			}

			const formData = new FormData();

			formData.append("title", newSong.title);
			formData.append("artist", newSong.artist);
			if (newSong.album && newSong.album !== "none") {
				formData.append("albumId", newSong.album);
			}

			formData.append("audioFile", files.audio);
			formData.append("imageFile", files.image);

			await axiosInstance.post("/admin/songs", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			setNewSong({
				title: "",
				artist: "",
				album: "",
			});

			setFiles({
				audio: null,
				image: null,
			});
			toast.success("Song added successfully");
		} catch (error: any) {
			toast.error("Failed to add song: " + error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
			<DialogTrigger asChild>
				<Button className='bg-emerald-500 hover:bg-emerald-600 text-black'>
					<Plus className='mr-2 h-4 w-4' />
					Add Song
				</Button>
			</DialogTrigger>

			<DialogContent className='bg-gradient-to-b from-indigo-900/80 to-purple-900/80 p-4 border border-purple-800/30 shadow-lg shadow-purple-500/10 max-h-[80vh] overflow-auto'>
				<DialogHeader>
					<DialogTitle>Add New Song</DialogTitle>
					<DialogDescription>Add a new song to your music library</DialogDescription>
				</DialogHeader>

				<div className='space-y-4 py-4'>
					<input
						type='file'
						accept='audio/*'
						ref={audioInputRef}
						hidden
						onChange={(e) => setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))}
					/>

					<input
						type='file'
						ref={imageInputRef}
						className='hidden'
						accept='image/*'
						onChange={(e) => setFiles((prev) => ({ ...prev, image: e.target.files![0] }))}
					/>

					{/* image upload area */}
					<div
						className='flex items-center justify-center p-6 border-2 border-dashed border-purple-600/50 rounded-lg cursor-pointer bg-indigo-800/20'
						onClick={() => imageInputRef.current?.click()}
					>
						<div className='text-center'>
							{files.image ? (
								<div className='space-y-2'>
									<div className='text-sm text-purple-300 drop-shadow-[0_0_3px_rgba(168,85,247,0.3)]'>Image selected:</div>
									<div className='text-xs text-blue-100'>{files.image.name.slice(0, 20)}</div>
								</div>
							) : (
								<>
									<div className='p-3 bg-indigo-800/50 rounded-full inline-block mb-2 border border-purple-500/30'>
										<Upload className='h-6 w-6 text-purple-300' />
									</div>
									<div className='text-sm text-blue-100 mb-2'>Upload artwork</div>
									<Button variant='outline' size='sm' className='text-xs bg-indigo-800/30 border-purple-600/50 text-blue-100 hover:bg-indigo-700/50'>
										Choose File
									</Button>
								</>
							)}
						</div>
					</div>

					{/* Audio upload */}
					<div className='space-y-2'>
						<label className='text-sm font-medium text-blue-100'>Audio File</label>
						<div className='flex items-center gap-2'>
							<Button variant='outline' onClick={() => audioInputRef.current?.click()} className='w-full bg-indigo-800/30 border-purple-600/50 text-blue-100 hover:bg-indigo-700/50'>
								{files.audio ? files.audio.name.slice(0, 20) : "Choose Audio File"}
							</Button>
						</div>
					</div>

					{/* other fields */}
					<div className='space-y-2'>
						<label className='text-sm font-medium text-blue-100'>Title</label>
						<Input
							value={newSong.title}
							onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
							className='bg-indigo-800/40 border-purple-600/50 text-blue-100 focus-visible:ring-purple-500'
						/>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-medium text-blue-100'>Artist</label>
						<Input
							value={newSong.artist}
							onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
							className='bg-indigo-800/40 border-purple-600/50 text-blue-100 focus-visible:ring-purple-500'
						/>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-medium text-blue-100'>Album (Optional)</label>
						<Select
							value={newSong.album}
							onValueChange={(value) => setNewSong({ ...newSong, album: value })}
						>
							<SelectTrigger className='bg-indigo-800/40 border-purple-600/50 text-blue-100 focus-visible:ring-purple-500'>
								<SelectValue placeholder='Select album' />
							</SelectTrigger>
							<SelectContent className='bg-indigo-900/90 border-purple-600/50 text-blue-100'>
								<SelectItem value='none'>No Album (Single)</SelectItem>
								{albums.map((album) => (
									<SelectItem key={album._id} value={album._id}>
										{album.title}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				<DialogFooter>
					<Button variant='outline' onClick={() => setSongDialogOpen(false)} disabled={isLoading} className='bg-indigo-800/30 border-purple-600/50 text-blue-100 hover:bg-indigo-700/50'>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={isLoading} className='bg-purple-600 hover:bg-purple-700 text-white'>
						{isLoading ? "Uploading..." : "Add Song"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
export default AddSongDialog;
