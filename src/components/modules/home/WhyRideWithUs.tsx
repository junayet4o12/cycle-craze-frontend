
const whyRideWithUs = [
    {
        title: "Road",
        points: [
            "Designed for speed and efficiency on paved roads, ideal for long-distance riders.",
            "Lightweight frames and aerodynamic features help you ride faster with less effort."
        ]
    },
    {
        title: "Mountain",
        points: [
            "Built to handle tough terrain, steep climbs, and rough trails with ease.",
            "Equipped with durable suspension systems for better control and comfort off-road."
        ]
    },
    {
        title: "Active",
        points: [
            "Perfect for everyday commuting, fitness, or casual weekend rides.",
            "Comfort-focused design with upright seating and smooth handling."
        ]
    },
    {
        title: "Electric",
        points: [
            "Pedal-assist motors make riding longer distances and climbing hills easier.",
            "Eco-friendly and efficient transportation with zero emissions."
        ]
    },
    {
        title: "Kids",
        points: [
            "Safe, fun, and easy-to-ride bikes designed for young riders of all ages.",
            "Adjustable features and sturdy frames that grow with your child."
        ]
    }
];

export default function WhyRideWithUs() {
    return (
        <div className="grid md:grid-cols-2 pt-10 xl:pt-20">
            <img className="w-[90%] xl:w-[80%] object-cover hidden md:block" src="/why-ride-banner.png" alt="" />
            <div className="space-y-6 mt-10 px-8 pb-8 ">
                <h2 className="uppercase">Why Ride <span className="text-primary">With Us?</span></h2>
                <div className="space-y-6">
                    {whyRideWithUs.map((item, index) => (
                        <div key={index} className="flex gap-4">
                            <div className="w-5 h-0.5 bg-primary mt-4.5"></div>
                            <div
                                
                                className="space-y-2"
                            >
                                <h4 className="text-primary font-semibold">{item.title}</h4>
                                <ul className="space-y-2 text-foreground">
                                    {item.points.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}