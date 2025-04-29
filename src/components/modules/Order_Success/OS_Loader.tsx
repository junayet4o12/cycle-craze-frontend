import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";


export default function OS_Loader() {
    return (
        <section className="space-y-8 py-8">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
                <Skeleton className="h-20 w-20 rounded-full" />
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48" />
            </div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}