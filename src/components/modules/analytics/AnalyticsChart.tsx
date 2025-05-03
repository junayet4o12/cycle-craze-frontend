import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGetLast12MonthsAnalyticsDataQuery } from "@/redux/features/analytics/analyticsApi";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, BarChart, Bar } from "recharts";
import AnalyticsChartSkeletonLoader from "./AnalyticsChartSkeletonLoader";

type ChartKey = "orders" | "revenue" | "users";
type ChartView = "line" | "bar";

const chartConfig = {
    totalRevenue: {
        label: "Total Revenue",
    },
} satisfies ChartConfig;

export default function AnalyticsChart() {
    const { data, isLoading } = useGetLast12MonthsAnalyticsDataQuery(undefined);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const chartTypeParam = searchParams.get("chartType");
    const chartType: ChartKey = ["orders", "revenue", "users"].includes(chartTypeParam as ChartKey)
        ? (chartTypeParam as ChartKey)
        : "revenue";

    const chartViewParam = searchParams.get("chartView");
    const chartView: ChartView = ["line", "bar"].includes(chartViewParam as ChartView)
        ? (chartViewParam as ChartView)
        : "line";

    if (isLoading) {
        return <AnalyticsChartSkeletonLoader />; 
    }

    const last12MonthsAnalyticsData = data?.data;
    const chartData = last12MonthsAnalyticsData?.[chartType];

    const handleSelectChange = (key: "chartType" | "chartView", value: string) => {
        searchParams.set(key, value);
        navigate(`?${searchParams.toString()}`);
    };

    const dataKey =
        chartType === "orders"
            ? "orders"
            : chartType === "users"
            ? "users"
            : "totalRevenue";

    return (
        <Card>
            <CardContent>
                <div className="flex items-center justify-between mb-6">
                    <h4>Overview</h4>
                    <div className="flex gap-4">
                        {/* Chart Type Selector */}
                        <Select value={chartType} onValueChange={(val) => handleSelectChange("chartType", val)}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="revenue">Revenue</SelectItem>
                                <SelectItem value="orders">Orders</SelectItem>
                                <SelectItem value="users">Users</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Chart View Selector */}
                        <Select value={chartView} onValueChange={(val) => handleSelectChange("chartView", val)}>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="line">Trend View</SelectItem>
                                <SelectItem value="bar">Analysis View</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    {chartView === "line" ? (
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="6 6" />
                            <XAxis dataKey="month" tickLine={false} tickMargin={10} />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line type="monotone" dataKey={dataKey} stroke="oklch(0.637 0.237 25.331)" activeDot={{ r: 8 }} />
                        </LineChart>
                    ) : (
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="6 6" />
                            <XAxis dataKey="month" tickLine={false} tickMargin={10} />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey={dataKey} fill="oklch(0.637 0.237 25.331)" />
                        </BarChart>
                    )}
                </ChartContainer>
            </CardContent>
        </Card>
    );
}