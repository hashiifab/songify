import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Album, Music } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";

const AdminPage = () => {
	const { isAdmin, isLoading } = useAuthStore();

	const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();

	useEffect(() => {
		fetchAlbums();
		fetchSongs();
		fetchStats();
	}, [fetchAlbums, fetchSongs, fetchStats]);

	if (!isAdmin && !isLoading) return <div>Unauthorized</div>;

	return (
		<div
			className='min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950
   to-black text-blue-100 p-8'
		>
			<Header />

			<DashboardStats />

			<Tabs defaultValue='songs' className='space-y-6'>
				<TabsList className='p-1 bg-gradient-to-b from-indigo-900/80 to-purple-900/80 border border-purple-800/30 shadow-lg shadow-purple-500/10'>
					<TabsTrigger value='songs' className='data-[state=active]:bg-indigo-800/70 text-blue-100 drop-shadow-[0_0_3px_rgba(168,85,247,0.3)]'>
						<Music className='mr-2 size-4' />
						Songs
					</TabsTrigger>
					<TabsTrigger value='albums' className='data-[state=active]:bg-indigo-800/70 text-blue-100 drop-shadow-[0_0_3px_rgba(168,85,247,0.3)]'>
						<Album className='mr-2 size-4' />
						Albums
					</TabsTrigger>
				</TabsList>

				<TabsContent value='songs'>
					<SongsTabContent />
				</TabsContent>
				<TabsContent value='albums'>
					<AlbumsTabContent />
				</TabsContent>
			</Tabs>
		</div>
	);
};
export default AdminPage;
