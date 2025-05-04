import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";


export default function OD_Loader() {
    return (
        <div className="w-full space-y-6">
            <div className="w-full h-24 bg-muted rounded-lg animate-pulse" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <div className="space-y-2">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="flex justify-between p-4 border rounded-lg bg-card">
                            <div className="flex gap-4">
                                <Skeleton className="h-20 w-20 rounded-md" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-40" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                            <div className="text-right">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-16 mt-2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <Skeleton className="h-8 w-1/4" />
                <div className="p-4 border rounded-lg space-y-2">
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-20" />
                    </div>
                </div>
            </div>
        </div>
    );
}