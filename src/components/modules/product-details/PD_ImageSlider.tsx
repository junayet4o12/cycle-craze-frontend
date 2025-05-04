import { Expand, PencilLineIcon } from 'lucide-react';
import { useState } from 'react';
import { PhotoProvider, PhotoView } from "react-photo-view";
import InnerImageZoom from 'react-inner-image-zoom';
import { Button } from '@/components/ui/button';
import MP_ProductGallery from '../dashboard/manage-products/MP_ProductGallery';
import useIsAdmin from '@/hooks/useIsAdmin';
const PD_ImageSlider = ({ images, id }: { images: string[]; id: string }) => {
    const [isAdmin, isLoading] = useIsAdmin()
    const [openGalleryModal, setOpenGalleryModal] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <>
            <div className="relative">

                <div className="relative w-full max-w-3xl mx-auto">

                    {/* Slide Image */}
                    <PhotoProvider>
                        <div className="overflow-hidden relative rounded-lg flex sliderParent">

                            <div className='absolute right-2 bottom-2 z-10 flex gap-2'>
                                <PhotoView src={images[currentIndex]}>
                                    <Button size={'icon'} className=' bg-muted-foreground  text-accent hover:bg-muted-foreground'>
                                        <Expand className='cursor-pointer size-5' />
                                    </Button>
                                </PhotoView>
                                {!isLoading && isAdmin && <Button onClick={() => setOpenGalleryModal(true)} className='bg-background text-foreground  hover:bg-background' size={'icon'}>
                                    <PencilLineIcon className='cursor-pointer size-5' />
                                </Button>}
                            </div>
                            <div
                                className="flex transition-transform ease-in-out duration-700  w-full aspect-[5/3]"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {images.map((slide, index) => (
                                    <PhotoView key={index} src={slide}>
                                        <div className='w-full flex-shrink-0 h-full flex justify-center items-center'>
                                            <InnerImageZoom
                                                src={slide}
                                                zoomType="hover"
                                                zoomScale={1.5}
                                                className='w-full'
                                            // alt={`Slide ${currentIndex + 1}`}
                                            />
                                        </div>
                                    </PhotoView>
                                ))}
                            </div>
                        </div>
                    </PhotoProvider>
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
                            <img className='w-16 sm:w-20 aspect-[5/3]  object-cover rounded-sm' src={item} alt="" />
                        </div>)
                    }
                </div>
            </div>
            {!isLoading && isAdmin && <MP_ProductGallery images={images} isDialogOpen={openGalleryModal} setIsDialogOpen={setOpenGalleryModal} productId={id} />}
        </>
    );
};

export default PD_ImageSlider;