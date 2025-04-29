import { Card, CardContent } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import "swiper/css";
import "swiper/css/navigation";

// Dummy feedback data
const feedbacks = [
  {
    name: "Sarah Khan",
    role: "Marketing Executive, Dhaka",
    rating: 5,
    comment: "Absolutely love the quality of the bikes! The service was quick and professional. Highly recommended!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rashed Ahmed",
    role: "Fitness Enthusiast, Chattogram",
    rating: 4,
    comment: "Great value for money. The cycle I bought is smooth, stylish, and perfect for my daily commute.",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Nadia Akter",
    role: "Teacher, Sylhet",
    rating: 5,
    comment: "I purchased a bicycle for my son. The team helped me choose the perfect one. Very satisfied!",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Tanvir Hossain",
    role: "Delivery Rider, Rajshahi",
    rating: 4,
    comment: "Durable and lightweight bikes. Made my delivery routes much easier. Highly functional!",
    image: "https://randomuser.me/api/portraits/men/47.jpg",
  },
];

export default function FeedBack() {
  return (
    <section className="py-8">
        {/* Heading */}
        <div className="flex justify-between items-end relative mb-6">
          <h1 className="uppercase text-outline text-[70px] md:text-[90px] absolute top-0">
            Reviews
          </h1>
          <h3 className="uppercase pt-14 relative z-10">
            What Our <br />
            <span className="text-primary">Customers Say</span>
          </h3>
          <div className="space-x-2 z-10">
            <Button variant="outline" size="icon" className="rounded-full fb-button-prev-review hover:bg-primary hover:text-white">
              <ArrowLeft />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full fb-button-next-review hover:bg-primary hover:text-white">
              <ArrowRight />
            </Button>
          </div>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".fb-button-next-review",
            prevEl: ".fb-button-prev-review",
          }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          
        >
          {feedbacks.map((fb, idx) => (
            <SwiperSlide key={idx} className="min-h-full">
              <Card className="p-4 h-full">
                <CardContent className="flex flex-col gap-4 items-center text-center">
                  <img
                    src={fb.image}
                    alt={fb.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <h4 className="font-semibold text-lg">{fb.name}</h4>
                  <p className="text-sm text-muted-foreground">{fb.role}</p>
                  <div className="flex gap-1 text-yellow-500">
                    {Array.from({ length: fb.rating }).map((_, starIdx) => (
                      <Star key={starIdx} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "{fb.comment}"
                  </p>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
    </section>
  );
}
