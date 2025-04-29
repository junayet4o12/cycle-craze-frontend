import { Instagram } from "lucide-react";

const allImages = [
    '/follow-us-1.jpg',
    '/follow-us-2.jpg',
    '/follow-us-3.jpg',
    '/follow-us-4.jpg',
    '/follow-us-5.jpg',
    '/follow-us-6.jpg',
]
export default function FollowUs() {
    return (
        <div className="bg-accent">
            <section className="py-16">
                <h3 className="uppercase pb-4">Follow us @Cycle_craze</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {
                        allImages.map((item, idx) => <div key={idx} className="w-full h-full relative group">
                            <img  src={item} className="w-full aspect-square" />
                           <div className="w-full h-full bg-black/20 absolute top-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-200"> <Instagram/></div>
                        </div>)
                    }
                </div>
            </section>
        </div>
    );
}