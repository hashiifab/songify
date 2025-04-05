import { Card, CardContent } from "@/components/ui/card";

type StatsCardProps = {
	icon: React.ElementType;
	label: string;
	value: string;
	bgColor: string;
	iconColor: string;
};

const StatsCard = ({ bgColor, icon: Icon, iconColor, label, value }: StatsCardProps) => {
	return (
		<div className='bg-gradient-to-b from-indigo-900/80 to-purple-900/80 p-4 border border-purple-800/30 shadow-lg shadow-purple-500/10 rounded-lg'>
			<div className='flex items-center gap-4'>
				<div className={`p-3 rounded-full ${bgColor} border border-purple-500/30`}>
					<Icon className={`size-6 ${iconColor} drop-shadow-[0_0_3px_rgba(168,85,247,0.3)]`} />
				</div>
				<div>
					<p className='text-sm text-blue-200/70'>{label}</p>
					<p className='text-2xl font-bold text-blue-100 drop-shadow-[0_0_3px_rgba(168,85,247,0.3)]'>{value}</p>
				</div>
			</div>
		</div>
	);
};
export default StatsCard;
