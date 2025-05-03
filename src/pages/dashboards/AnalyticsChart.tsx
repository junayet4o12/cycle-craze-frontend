import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { SalesData } from "@/types";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartConfig = {
    totalRevenue: {
        label: "Total Revenue",
    },
} satisfies ChartConfig
export default function AnalyticsChart({ data }: { data: SalesData }) {
    const last12MonthRevenueAndOrders = data.ordersData.overYearData;
    return (
        <Card>
            <CardContent>
                <div>
                    <h4 className="mb-6">Overview</h4>
                    
                </div>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <LineChart accessibilityLayer data={last12MonthRevenueAndOrders}>
                        <CartesianGrid strokeDasharray="6 6" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                        // axisLine={false}
                        // tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="totalRevenue" stroke="oklch(0.637 0.237 25.331)" activeDot={{ r: 8 }} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}