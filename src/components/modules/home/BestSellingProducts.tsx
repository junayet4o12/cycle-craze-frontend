import { Button } from "@/components/ui/button";
import { useProductsQuery } from "@/redux/features/product/productApi";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function BestSellingProducts() {
    const { data, isLoading, isFetching } = useProductsQuery([
        { name: 'limit', value: '4' },
        { name: 'fields', value: 'name,images,price' },

    ]);

    if (isLoading || isFetching) {
        return ''
    }
    const bikes = data?.data
    return (
        <section className="w-full py-8">
            <div className="flex justify-between items-end relative">
                <h1 className="uppercase text-outline text-[70px] md:text-[90px] absolute top-0">Bicycles</h1>
                <h3 className="uppercase pt-14 relative">
                    Meet our <br />
                    <span className="text-primary">BESTSELLERS</span>
                </h3>
                <div className="space-x-2 relative">
                    <Button variant="outline" size={"icon"} className="rounded-full button-prev hover:bg-primary hover:text-white">
                        <ArrowLeft />
                    </Button>

                    <Button variant="outline" size={"icon"} className="rounded-full button-next hover:bg-primary hover:text-white">
                        <ArrowRight />
                    </Button>
                </div>
            </div>

            <div className="relative">
                {/* Navigation Buttons */}


                <Swiper
                    modules={[Navigation]}
                    navigation={{ nextEl: '.button-next', prevEl: '.button-prev' }}
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
                            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md bg-transparent border-none">
                                <CardContent className="p-4">
                                    <div className="relative">
                                        <img
                                            src={bike.images[0]}
                                            alt={bike.name}
                                            className="mx-auto h-40 w-full object-cover rounded-lg"
                                        />
                                        {/* {bike.discount && (
                                            <span className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-xs text-white">
                                                -{bike.discount}%
                                            </span>
                                        )} */}
                                    </div>
                                    <div className="mt-4 text-center">
                                        <p className="font-medium">{bike.name}</p>
                                        <p className="text-lg font-bold">
                                            ৳{bike.price}
                                            {/* {bike.oldPrice && (
                                                <span className="ml-2 text-sm text-gray-400 line-through">
                                                    ${bike.oldPrice}
                                                </span>
                                            )} */}
                                        </p>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-center p-4 sm:opacity-0 transition-all duration-300 group-hover:opacity-100">
                                    <Button variant="outline" className="flex items-center gap-2">
                                        Add To Cart <ShoppingBag size={16} />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* View All Link */}
                <div className="text-center mt-8">
                    <p className="text-sm hover:text-primary cursor-pointer hover:underline font-semibold">SEE ALL BIKES</p>
                </div>
            </div>
        </section>
    );
}