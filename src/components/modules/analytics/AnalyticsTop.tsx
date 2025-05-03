import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SalesData } from "@/types";
import { ShoppingCart, Users } from "lucide-react";


export default function AnalyticsTop({ data, isLoading: isLoading }: { data: SalesData, isLoading: boolean }) {
  if (isLoading) {
    return <div className="flex gap-4">
      <Skeleton className="w-[240px] h-[115px]" />
      <Skeleton className="w-[240px] h-[115px]" />
      <Skeleton className="w-[240px] h-[115px]" />
      <Skeleton className="w-[240px] h-[115px]" />
    </div >
  }
  return (
    <div className="flex gap-4 flex-wrap">
      {/* revenue  */}
      <div className="w-[240px]">
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
              <h2 className="text-xl text-foreground font-bold">৳{data.revenueData.total}</h2>
              {data.revenueData.percentageChange}% from last month
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className="w-[240px]">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center font-normal">
                <p className="text-sm">
                  Total   Orders
                </p>
                <ShoppingCart size={16} className="text-muted-foreground" />
              </div>
            </CardTitle>
            <CardDescription>
              <h2 className="text-xl text-foreground font-bold">{data.ordersData.total}</h2>
              {data.ordersData.percentageChange}% from last month
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className="w-[240px]">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center font-normal">
                <p className="text-sm">
                  Total   Users
                </p>
                <Users size={16} className="text-muted-foreground" />
              </div>
            </CardTitle>
            <CardDescription>
              <h2 className="text-xl text-foreground font-bold">{data.usersData.total}</h2>
              {data.usersData.percentageChange}% from last month
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}