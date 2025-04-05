import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Library } from "lucide-react";
import AlbumsTable from "./AlbumsTable";
import AddAlbumDialog from "./AddAlbumDialog";

const AlbumsTabContent = () => {
	return (
		<Card className='bg-gradient-to-b from-indigo-900/80 to-purple-900/80 border border-purple-800/30 shadow-lg shadow-purple-500/10'>
			<CardHeader>
				<div className='flex items-center justify-between'>
					<div>
						<CardTitle className='flex items-center gap-2'>
							<Library className='h-5 w-5 text-violet-500' />
							Albums Library
						</CardTitle>
						<CardDescription>Manage your album collection</CardDescription>
					</div>
					<AddAlbumDialog />
				</div>
			</CardHeader>

			<CardContent>
				<AlbumsTable />
			</CardContent>
		</Card>
	);
};
export default AlbumsTabContent;
