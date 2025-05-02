import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesData } from "@/types";


export default function AnalyticsTop({ data }: { data: SalesData }) {
  return (
    <div className="w-[200px]">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center font-normal">
              <p className="text-sm">
                Total Revenue
              </p>
              <span className="text-sm text-muted-foreground">৳</span>
            </div>
          </CardTitle>
          <CardDescription>
          <h2 className="text-xl text-foreground font-bold">৳{data.currentTotal}</h2>
          {data.percentageChange}% from last month
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}