
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';
import { Link } from "react-router-dom";

const ShopNowBtn = () => {
    return <Link to={'/shop'}>
        <Button className="max-w-max  sm:h-12 sm:px-7 text-white border border-input/50 hover:bg-white/5 hover:text-white " variant="ghost">
            Shop Now
        </Button >
    </Link>
}
export default function Hero() {
    return (
        <Swiper
            modules={[Autoplay, Navigation, Pagination, EffectFade]}
            autoplay={{ delay: 8000, disableOnInteraction: false }}
            effect="fade"
            speed={3000}
            loop={true}
            pagination={{ clickable: true }}
            navigation={false}
            className="w-full max-h-[calc(100vh-68px)]"
        >
            <SwiperSlide>
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 z-10 flex flex-col justify-center gap-2 sm:gap-4 px-8 bg-black/40">
                        <section className=" space-y-2 sm:space-y-4 w-full">
                            <h6 className="text-white">For a better ride</h6>
                            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                                Find Your <span className="text-primary">Mountain</span> Bike Here
                            </h1>
                            <ShopNowBtn />
                        </section>
                    </div>
                    <img
                        src="/hero-banner-2.jpg"
                        alt="Hero"
                        className="w-full h-full object-cover"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 z-10 flex flex-col justify-center gap-4 px-8 bg-black/40 items-center">
                        <div className="space-y-2 sm:space-y-4">
                            <h6 className="text-white">For a better ride</h6>
                            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                                Find Your <span className="text-primary">Mountain</span> <br className="block sm:hidden" /> Bike Here
                            </h1>
                            <ShopNowBtn />
                        </div>
                    </div>
                    <img
                        src="/hero-banner-1.jpg"
                        alt="Hero"
                        className="w-full h-full object-cover"
                    />
                </div>
            </SwiperSlide>
        </Swiper>
    );
}
