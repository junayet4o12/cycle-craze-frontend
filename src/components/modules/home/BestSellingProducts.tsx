import { Button } from "@/components/ui/button";
import { useProductsQuery } from "@/redux/features/product/productApi";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

export default function BestSellingProducts() {
    const { data, isLoading, isFetching } = useProductsQuery([
        { name: "limit", value: "4" },
        { name: "fields", value: "name,images,price" },
    ]);

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

            <div className="relative">
                {isLoading || isFetching ? (
                    // 🔄 Show skeletons while loading
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
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
                                <Link to={`/product-details/${bike._id}`}>
                                    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md bg-transparent border-none">
                                        <CardContent className="p-4">
                                            <div className="relative">
                                                <img
                                                    src={bike.images[0]}
                                                    alt={bike.name}
                                                    className="mx-auto h-40 w-full object-cover rounded-lg"
                                                />
                                            </div>
                                            <div className="mt-4 text-center">
                                                <p className="font-medium">{bike.name}</p>
                                                <p className="text-lg font-bold">৳{bike.price}</p>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex justify-center p-4 sm:opacity-0 transition-all duration-300 group-hover:opacity-100">
                                            <Button variant="outline" className="flex items-center gap-2">
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
