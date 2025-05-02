import AnalyticsTop from "@/components/modules/analytics/AnalyticsTop";
import { useTotalRevenueQuery } from "@/redux/features/analytics/analyticsApi";
import { ChartColumnBig } from "lucide-react";


export default function Analytics() {
  const { data, isLoading } = useTotalRevenueQuery(undefined);
  if (isLoading) {
    return ''
  }
  const salesData = data?.data
  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Top header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ChartColumnBig className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Analytics</h1>
        </div>
      </div>
      {
        salesData && <AnalyticsTop data={salesData} />
      }

    </div>
  );
}