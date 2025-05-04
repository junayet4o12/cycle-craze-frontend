import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { useGetTopSellingProductsQuery } from "@/redux/features/analytics/analyticsApi";

export default function BestSellingProducts() {
    const { data , isLoading, isFetching } = useGetTopSellingProductsQuery({ name: 'limit', value: '5' });


    const bikes = data?.data;

    return (
        <section className="w-full py-8">
            <div className="flex justify-between items-end relative">
                <h1 className="uppercase text-outline text-[70px] md:text-[90px] absolute top-0">
                    Bicycles
                </h1>
                <h3 className="uppercase pt-14 relative">
                    Meet our <br />
                    <span className="text-primary">BESTSELLERS</span>
                </h3>
                <div className="space-x-2 relative">
                    <Button variant="outline" size="icon" className="rounded-full button-prev hover:bg-primary hover:text-white">
                        <ArrowLeft />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full button-next hover:bg-primary hover:text-white">
                        <ArrowRight />
                    </Button>
                </div>
            </div>

            <div className="relative mt-8">
                {isLoading || isFetching ? (
                    // 🔄 Show skeletons while loading
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <Card key={idx} className="overflow-hidden bg-transparent border-none">
                                <CardContent className="p-4">
                                    <Skeleton className="h-40 w-full rounded-lg mb-4" />
                                    <div className="text-center space-y-2">
                                        <Skeleton className="h-4 w-3/4 mx-auto" />
                                        <Skeleton className="h-4 w-1/2 mx-auto" />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-center p-4">
                                    <Skeleton className="h-10 w-32 rounded-md" />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    // ✅ Show actual product cards when loaded
                    <Swiper
                        modules={[Navigation]}
                        navigation={{ nextEl: ".button-next", prevEl: ".button-prev" }}
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 },
                        }}
                    >
                        {bikes?.map((bike, idx) => (
                            <SwiperSlide key={idx}>
                                <Link to={`/product-details/${bike.productId}`}>
                                    <Card className="group relative overflow-hidden border bg-background shadow-sm transition-all duration-300 hover:shadow-md">
                                        <CardContent className="p-4">
                                            <div className="relative h-40 rounded-xl overflow-hidden">
                                                <img
                                                    src={bike.images[0]}
                                                    alt={bike.name}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="mt-4 text-center space-y-1">
                                                <p className="text-sm font-semibold text-foreground truncate">{bike.name}</p>
                                                <p className="text-lg font-bold text-primary">৳{bike.price}</p>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="flex justify-center p-4">
                                            <Button
                                                variant="outline"
                                                className="flex items-center gap-2 hover:bg-accent hover:text-accent-foreground"
                                            >
                                                Add To Cart <ShoppingBag size={16} />
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}

                {/* View All Link */}
                <div className="text-center mt-8">
                    <Link to={'/shop'} className="text-sm hover:text-primary cursor-pointer hover:underline font-semibold">
                        SEE ALL BIKES
                    </Link>
                </div>
            </div>
        </section>
    );
}
