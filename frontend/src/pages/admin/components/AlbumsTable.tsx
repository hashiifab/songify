import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Music, Trash2 } from "lucide-react";
import { useEffect } from "react";

const AlbumsTable = () => {
	const { albums, deleteAlbum, fetchAlbums } = useMusicStore();

	useEffect(() => {
		fetchAlbums();
	}, [fetchAlbums]);

	return (
		<div className='rounded-lg bg-gradient-to-b from-indigo-900/80 to-purple-900/80 p-4 border border-purple-800/30 shadow-lg shadow-purple-500/10'>
			<Table>
				<TableHeader>
					<TableRow className='hover:bg-indigo-800/50'>
						<TableHead className='w-[50px]'></TableHead>
						<TableHead>Title</TableHead>
						<TableHead>Artist</TableHead>
						<TableHead>Release Year</TableHead>
						<TableHead>Songs</TableHead>
						<TableHead className='text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>
			<TableBody>
				{albums.map((album) => (
					<TableRow key={album._id} className='hover:bg-indigo-800/50'>
						<TableCell>
							<img src={album.imageUrl} alt={album.title} className='w-10 h-10 rounded object-cover' />
						</TableCell>
						<TableCell className='font-medium text-blue-100 drop-shadow-[0_0_3px_rgba(168,85,247,0.3)]'>{album.title}</TableCell>
						<TableCell className='text-blue-100'>{album.artist}</TableCell>
						<TableCell>
							<span className='inline-flex items-center gap-1 text-zinc-400'>
								<Calendar className='h-4 w-4' />
								{album.releaseYear}
							</span>
						</TableCell>
						<TableCell>
							<span className='inline-flex items-center gap-1 text-zinc-400'>
								<Music className='h-4 w-4' />
								{album.songs.length} songs
							</span>
						</TableCell>
						<TableCell className='text-right'>
							<div className='flex gap-2 justify-end'>
								<Button
									variant='ghost'
									size='sm'
									onClick={() => deleteAlbum(album._id)}
									className='text-purple-300 hover:text-purple-200 hover:bg-purple-500/20'
								>
									<Trash2 className='h-4 w-4' />
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
		</div>
	);
};
export default AlbumsTable;
