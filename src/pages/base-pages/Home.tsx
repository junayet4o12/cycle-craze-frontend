import BestSellingProducts from "@/components/modules/home/BestSellingProducts";
import Hero from "@/components/modules/home/Hero";
import WhereToWork from "@/components/modules/home/WhereToWork";
import WhyRideWithUs from "@/components/modules/home/WhyRideWithUs";


export default function Home() {
  return (
    <div>
      <Hero/>
      <WhyRideWithUs/>
      <WhereToWork/>
      <BestSellingProducts/>
    </div>
  );
}