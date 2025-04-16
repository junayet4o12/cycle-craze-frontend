import { Button } from "@/components/ui/button";


export default function WhereToWork() {
    return (
        <div className="grid md:grid-cols-2 pt-10 xl:pt-20 bg-foreground ">

            <div className="space-y-6 mt-10 px-8 text-accent max-w-xl md:ml-auto flex flex-col justify-center">
                <h2 className="uppercase"> Where to?
                    <br />
                    <span className="text-primary">work</span>
                </h2>
                <h6>Power and Style Unite.</h6>
                <p>Leo integer malesuada nunc vel risus commodo viverra. Imperdiet proin fermentum leo vel orci porta non. Felis eget velit aliquet sagittis id consectetur purus ut faucibus..</p>
                <div className="space-x-2">
                    <Button variant={"ghost"} className="border border-primary hover:!bg-transparent hover:text-accent">Discover Now</Button>
                    <Button className="hover:!bg-transparent hover:text-accent" variant={"ghost"}>Shop Now</Button>
                </div>
            </div>
            <img className="object-cover hidden md:block ml-auto w-[90%] xl:w-[80%]" src="/public/where-to-work-banner.png" alt="" />
        </div>
    );
}