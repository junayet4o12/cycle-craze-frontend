
const allImages = [
    '/public/follow-us-1.jpg',
    '/public/follow-us-2.jpg',
    '/public/follow-us-3.jpg',
    '/public/follow-us-4.jpg',
    '/public/follow-us-5.jpg',
    '/public/follow-us-6.jpg',
]
export default function FollowUs() {
    return (
        <div className="bg-accent">
            <section className="py-12">
                <h3 className="uppercase pb-4">Follow us @Cycle_craze</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {
                        allImages.map((item, idx) => <img key={idx} src={item} className="w-full aspect-square" />)
                    }
                </div>
            </section>
        </div>
    );
}