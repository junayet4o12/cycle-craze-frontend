
type PropTypes = {
    category: string;
    hourlyRate: number;
    dailyRate: number;
    weeklyRate: number;
}
export default function RentalOption({ category, hourlyRate, dailyRate, weeklyRate }: PropTypes) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="font-medium">{category}</div>
            <div className="flex gap-4 mt-2 sm:mt-0">
                <div className="text-sm">
                    <span className="text-gray-500">Hourly:</span> {hourlyRate}
                </div>
                <div className="text-sm">
                    <span className="text-gray-500">Daily:</span> {dailyRate}
                </div>
                <div className="text-sm">
                    <span className="text-gray-500">Weekly:</span> {weeklyRate}
                </div>
            </div>
        </div>
    );
}