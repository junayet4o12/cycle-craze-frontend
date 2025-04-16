import { Button } from "@/components/ui/button";
import { useProductsQuery } from "@/redux/features/product/productApi";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

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
            <div className="flex justify-between items-end">
                <h3 className="uppercase">
                    Meet our <br />
                    <span className="text-primary">BESTSELLERS</span></h3>
                <div className="space-x-2">
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
                            <div className="text-center cursor-pointer group">
                                <div className="relative">
                                    <img src={bike.images[0]} alt={bike.name} className="mx-auto h-40 w-full object-contain" />
                                    {/* {bike.discount && (
                                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                            -{bike.discount}%
                                        </span>
                                    )} */}
                                </div>
                                <p className=" font-medium">{bike.name}</p>
                                <p className="text-lg font-bold">
                                ৳{bike.price}
                                    {/* {bike.oldPrice && (
                                        <span className="line-through text-gray-400 text-sm ml-2">
                                            ${bike.oldPrice.toFixed(2)}
                                        </span>
                                    )} */}
                                </p>
                                <div className="mt-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                    <Button variant={"outline"}>Add To Cart <ShoppingBag /></Button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* View All Link */}
                <div className="text-center mt-8">
                    <Button variant="link" className="text-black font-semibold hover:text-primary">
                        SEE ALL BIKES
                    </Button>
                </div>
            </div>
        </section>
    );
}