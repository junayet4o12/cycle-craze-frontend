import { useGetTopSellingProductsQuery } from "@/redux/features/analytics/analyticsApi";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsTopTenProducts() {
  const { data, isLoading } = useGetTopSellingProductsQuery(undefined);

  if (isLoading) {
    return (
      <Card className="w-full max-w-md p-4">
        <Skeleton className="h-6 w-40 mb-2" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 py-2">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </Card>
    );
  }

  const productsData = data?.data || [];

  return (
    <Card className="w-full max-w-md p-4">
      <h2 className="text-lg font-semibold"> Top ten Sold Products.</h2>
      <CardContent className="p-0">
        {productsData.map((product, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b last:border-none"
          >
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage className="object-cover" src={product.images[0] || undefined} alt={product.name} />
                <AvatarFallback>{product.name?.charAt(0) || "?"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-xs text-muted-foreground">{product.brand}</p>
              </div>
            </div>
            <div className="text-sm font-semibold text-right">
              Sold: {product.totalQuantitySold} <br />
              <p className="text-muted-foreground text-sm">৳{product.totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
