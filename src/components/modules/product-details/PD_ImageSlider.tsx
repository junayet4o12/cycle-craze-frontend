import { Expand } from 'lucide-react';
import { useState } from 'react';
import { PhotoProvider, PhotoView } from "react-photo-view";
import InnerImageZoom from 'react-inner-image-zoom';
import { Button } from '@/components/ui/button';
const PD_ImageSlider = ({ images }: { images: string[] }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    return (
        <div className="relative">

            <div className="relative w-full max-w-3xl mx-auto">

                {/* Slide Image */}
                <div className="overflow-hidden relative rounded-lg flex sliderParent">

                    <PhotoProvider>
                        <PhotoView src={images[currentIndex]}>
                            <Button className='absolute right-2 bottom-2 bg-muted-foreground z-10 text-accent hover:bg-muted-foreground'>
                                <Expand className='cursor-pointer size-5' />
                            </Button>
                        </PhotoView>
                    </PhotoProvider>

                    <div
                        className="flex transition-transform ease-in-out duration-700  w-full aspect-[5/3]"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {images.map((slide, index) => (
                            <div key={index} className='w-full flex-shrink-0 h-full flex justify-center items-center'>
                                <InnerImageZoom
                                    src={slide}
                                    zoomType="hover"
                                    zoomScale={1.5}
                                    className='w-full'
                                // alt={`Slide ${currentIndex + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'
                                }`}
                        />
                    ))}
                </div>
            </div>

            <div className='flex flex-wrap gap-2 py-3 items-center justify-center'>
                {
                    images.map((item, idx) => <div onClick={() => setCurrentIndex(idx)} className={`border-2 transition-all cursor-pointer duration-300 ${idx === currentIndex ? ' border-primary' : 'border-transparent'} p-1 rounded-md`} key={idx}>
                        <img className='w-20 h-12  object-cover rounded-sm' src={item} alt="" />
                    </div>)
                }
            </div>
        </div>
    );
};

export default PD_ImageSlider;