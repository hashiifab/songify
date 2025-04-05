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
import { axiosInstance } from "@/lib/axios";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const AddAlbumDialog = () => {
	const [albumDialogOpen, setAlbumDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [newAlbum, setNewAlbum] = useState({
		title: "",
		artist: "",
		releaseYear: new Date().getFullYear(),
	});

	const [imageFile, setImageFile] = useState<File | null>(null);

	const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageFile(file);
		}
	};

	const handleSubmit = async () => {
		setIsLoading(true);

		try {
			if (!imageFile) {
				return toast.error("Please upload an image");
			}

			const formData = new FormData();
			formData.append("title", newAlbum.title);
			formData.append("artist", newAlbum.artist);
			formData.append("releaseYear", newAlbum.releaseYear.toString());
			formData.append("imageFile", imageFile);

			await axiosInstance.post("/admin/albums", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			setNewAlbum({
				title: "",
				artist: "",
				releaseYear: new Date().getFullYear(),
			});
			setImageFile(null);
			setAlbumDialogOpen(false);
			toast.success("Album created successfully");
		} catch (error: any) {
			toast.error("Failed to create album: " + error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={albumDialogOpen} onOpenChange={setAlbumDialogOpen}>
			<DialogTrigger asChild>
				<Button className='bg-violet-500 hover:bg-violet-600 text-white'>
					<Plus className='mr-2 h-4 w-4' />
					Add Album
				</Button>
			</DialogTrigger>
			<DialogContent className='bg-gradient-to-b from-indigo-900/80 to-purple-900/80 p-4 border border-purple-800/30 shadow-lg shadow-purple-500/10'>
				<DialogHeader>
					<DialogTitle>Add New Album</DialogTitle>
					<DialogDescription>Add a new album to your collection</DialogDescription>
				</DialogHeader>
				<div className='space-y-4 py-4'>
					<input
						type='file'
						ref={fileInputRef}
						onChange={handleImageSelect}
						accept='image/*'
						className='hidden'
					/>
					<div
						className='flex items-center justify-center p-6 border-2 border-dashed border-purple-600/50 rounded-lg cursor-pointer bg-indigo-800/20'
						onClick={() => fileInputRef.current?.click()}
					>
						<div className='text-center'>
							<div className='p-3 bg-indigo-800/50 rounded-full inline-block mb-2 border border-purple-500/30'>
								<Upload className='h-6 w-6 text-purple-300' />
							</div>
							<div className='text-sm text-blue-100 mb-2'>
								{imageFile ? imageFile.name : "Upload album artwork"}
							</div>
							<Button variant='outline' size='sm' className='text-xs bg-indigo-800/30 border-purple-600/50 text-blue-100 hover:bg-indigo-700/50'>
								Choose File
							</Button>
						</div>
					</div>
					<div className='space-y-2'>
						<label className='text-sm font-medium text-blue-100'>Album Title</label>
						<Input
							value={newAlbum.title}
							onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
							className='bg-indigo-800/40 border-purple-600/50 text-blue-100 focus-visible:ring-purple-500'
							placeholder='Enter album title'
						/>
					</div>
					<div className='space-y-2'>
						<label className='text-sm font-medium text-blue-100'>Artist</label>
						<Input
							value={newAlbum.artist}
							onChange={(e) => setNewAlbum({ ...newAlbum, artist: e.target.value })}
							className='bg-indigo-800/40 border-purple-600/50 text-blue-100 focus-visible:ring-purple-500'
							placeholder='Enter artist name'
						/>
					</div>
					<div className='space-y-2'>
						<label className='text-sm font-medium text-blue-100'>Release Year</label>
						<Input
							type='number'
							value={newAlbum.releaseYear}
							onChange={(e) => setNewAlbum({ ...newAlbum, releaseYear: parseInt(e.target.value) })}
							className='bg-indigo-800/40 border-purple-600/50 text-blue-100 focus-visible:ring-purple-500'
							placeholder='Enter release year'
							min={1900}
							max={new Date().getFullYear()}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button variant='outline' onClick={() => setAlbumDialogOpen(false)} disabled={isLoading} className='bg-indigo-800/30 border-purple-600/50 text-blue-100 hover:bg-indigo-700/50'>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						className='bg-purple-600 hover:bg-purple-700 text-white'
						disabled={isLoading || !imageFile || !newAlbum.title || !newAlbum.artist}
					>
						{isLoading ? "Creating..." : "Add Album"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
export default AddAlbumDialog;
