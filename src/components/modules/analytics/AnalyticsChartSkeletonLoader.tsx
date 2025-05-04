import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
type ChartKey = "orders" | "revenue" | "users";
type ChartView = "line" | "bar";
export default function AnalyticsChartSkeletonLoader() {
    const [searchParams] = useSearchParams();

    const chartTypeParam = searchParams.get("chartType") as ChartKey | undefined;
    const chartType = chartTypeParam ? ["orders", "revenue", "users"].includes(chartTypeParam)
        ? chartTypeParam
        : "revenue" : 'revenue';

    const chartViewParam = searchParams.get("chartView") as ChartView | undefined;
    const chartView = chartViewParam ? ["line", "bar"].includes(chartViewParam)
        ? chartViewParam
        : "line" : 'line';

    return (
        <Card>
            <CardContent>
                <div className="flex items-center justify-between mb-6">
                    <h4>Overview</h4>
                    <div className="flex gap-4">
                        {/* Chart Type Selector */}
                        <Select value={chartType} disabled>
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
                        <Select value={chartView} disabled>
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

                <div className="min-h-[300px] w-full relative">
                    {/* Main chart area skeleton */}
                    <Skeleton className="w-full h-[250px] rounded-md" />

                    {/* X-axis labels skeleton */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 flex justify-between px-6">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <Skeleton key={i} className="w-4 h-4 rounded-sm" />
                        ))}
                    </div>

                    {/* Y-axis labels skeleton */}
                    <div className="absolute top-0 bottom-8 left-0 w-12 flex flex-col justify-between py-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="w-8 h-3 rounded-sm" />
                        ))}
                    </div>

                    {/* Chart content skeleton based on chart type */}
                    {chartView === "line" ? (
                        <div className="absolute left-12 right-6 top-4 bottom-8">
                            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path
                                    d="M0,80 C10,70 20,40 30,60 C40,80 50,20 60,40 C70,60 80,30 90,20 L100,30"
                                    fill="none"
                                    stroke="hsl(var(--muted-foreground))"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeDasharray="2 2"
                                />
                            </svg>
                        </div>
                    ) : (
                        <div className="absolute left-12 right-6 top-4 bottom-8 flex items-end justify-between">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <Skeleton
                                    key={i}
                                    className="w-6 rounded-t-sm mx-1"
                                    style={{ height: `${20 + Math.random() * 60}%` }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}