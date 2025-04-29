import BestSellingProducts from "@/components/modules/home/BestSellingProducts";
import FeaturedCategories from "@/components/modules/home/FeaturedCategories";
import FeedBack from "@/components/modules/home/FeedBack";
import FollowUs from "@/components/modules/home/FollowUs";
import Hero from "@/components/modules/home/Hero";
import WhereToWork from "@/components/modules/home/WhereToWork";
import WhyRideWithUs from "@/components/modules/home/WhyRideWithUs";


export default function Home() {
  return (
    <div>
      <Hero/>
      <FeaturedCategories/>
      <BestSellingProducts/>
      <WhyRideWithUs/>
      <WhereToWork/>
      <FeedBack />
      <FollowUs/>
    </div>
  );
}