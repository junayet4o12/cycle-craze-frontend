import AnalyticsChart from "@/components/modules/analytics/AnalyticsChart";
import AnalyticsTop from "@/components/modules/analytics/AnalyticsTop";
import AnalyticsTopTenProducts from "@/components/modules/analytics/AnalyticsTopTenProducts";
import { ChartColumnBig } from "lucide-react";


export default function Analytics() {


  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Top header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ChartColumnBig className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Analytics</h1>
        </div>

      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <AnalyticsTop />
          <AnalyticsChart />

        </div>
        <AnalyticsTopTenProducts />
      </div>
    </div>
  );
}