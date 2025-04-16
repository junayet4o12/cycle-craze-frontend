import { useState, useRef, Dispatch, SetStateAction } from 'react';
import { Trash2, Plus, Save, Maximize, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUpdateProductMutation } from '@/redux/features/product/productApi';
import { toast } from 'sonner';
import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';
import { errorMessageGenerator } from '@/utils/errorMessageGenerator';

type PropsType = {
    images: string[];
    isDialogOpen: boolean;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
    productId: string;
};

type ImageType = {
    id: string | number;
    src: string | File;
    alt: string;

};

export default function MP_ProductGallery({ images: incomingImages, isDialogOpen, setIsDialogOpen, productId }: PropsType) {
    const [updateProduct, { isLoading }] = useUpdateProductMutation()

    const [imageViewOpen, setImageViewOpen] = useState<boolean>(false);
    const [showDropIndicator, setShowDropIndicator] = useState<boolean>(false);
    const [images, setImages] = useState<ImageType[]>(
        incomingImages.map((item) => ({
            id: item,
            src: item,
            alt: '/public/product-placeholder.png',
        }))
    );
    const [currentImage, setCurrentImage] = useState<ImageType | null>(null);
    const [draggedItem, setDraggedItem] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const closeModal = () => setIsDialogOpen(false);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        setDraggedItem(index);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        if (draggedItem === null || draggedItem === index) return;

        const newImages = [...images];
        const draggedItemContent = newImages[draggedItem];
        newImages.splice(draggedItem, 1);
        newImages.splice(index, 0, draggedItemContent);

        setDraggedItem(index);
        setImages(newImages);
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowDropIndicator(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowDropIndicator(false);
    };

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowDropIndicator(false);
        if (e.dataTransfer.files) {
            handleAddImages(e.dataTransfer.files);
        }
    };

    const handleAddImages = (files: FileList) => {
        if (!files.length) return;

        const newImages = [...images];
        Array.from(files).forEach((file, index) => {
            newImages.push({
                id: Date.now() + index,
                src: file, // Replace with real URL after upload
                alt: file.name || `Product ${newImages.length + 1}`,
            });
        });

        setImages(newImages);
    };

    const deleteImage = (id: string | number) => {
        setImages(images.filter((img) => img.id !== id));
        if (currentImage && currentImage.id === id) {
            setCurrentImage(null);
            setImageViewOpen(false);
        }
    };

    const saveChanges = async () => {
        if (images.length < 1) {
            toast.error('Keep at least one image!');
            return;
        }

        const newImageUrls = [];
        const toastId = toast.loading('Gallery is Updating...')
        for (const item of images) {
            if (typeof item.src === 'string') {
                newImageUrls.push(item.src);
            }
            else if (item.src instanceof File) {
                try {
                    const imageUrl = await uploadImageToCloudinary(item.src);
                    if (imageUrl) {
                        newImageUrls.push(imageUrl);
                    } else {
                        toast.error('Failed to upload one of the images.');
                    }
                } catch (error) {
                    console.error('Error uploading image:', error);
                    toast.error('Error uploading image!');
                }
            } else {
                toast.error('Invalid image format!');
            }
        }

        if (newImageUrls.length < 1) {
            toast.error('Image upload failed. Please try again.', { id: toastId });
            return;
        }
        try {
            await updateProduct({ productId: productId, updatedData: { images: newImageUrls } }).unwrap();
            toast.success('Product gallery updated successfully!', { id: toastId, duration: 2000 });
            setIsDialogOpen(false)
        } catch (err) {
            console.error(err);
            toast.error(errorMessageGenerator(err), { id: toastId });
        }



    };

    const viewImage = (image: ImageType) => {
        setCurrentImage(image);
        setImageViewOpen(true);
    };

    // URL.createObjectURL(field.value)


    return (
        <>
            {/* Main Gallery Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-4xl max-h-screen flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Product Gallery</DialogTitle>
                    </DialogHeader>

                    <div
                        className={`flex-1 overflow-hidden ${showDropIndicator ? 'border-2 border-dashed border-blue-500 bg-blue-50' : ''}`}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleFileDrop}
                    >
                        <ScrollArea className="h-96 w-full px-1">
                            {showDropIndicator && (
                                <div className="absolute inset-0 flex items-center justify-center bg-blue-50 bg-opacity-90 z-10">
                                    <div className="text-center">
                                        <Plus className="h-12 w-12 mx-auto text-blue-500" />
                                        <p className="text-lg font-medium mt-2">Drop images to add to gallery</p>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
                                {images.map((img, index) => (
                                    <Card
                                        key={img.id}
                                        className={`overflow-hidden p-2 w-full aspect-[6/5] ${draggedItem === index ? 'opacity-50 border-blue-400' : ''}`}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragOver={(e) => handleDragOver(e, index)}
                                        onDragEnd={handleDragEnd}
                                    >
                                        <CardContent className="p-0 relative group">
                                            <img
                                                src={img.src instanceof File ? URL.createObjectURL(img.src) : img.src}
                                                alt={img.alt}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute max-w-max right-0 top-0 transition-all flex justify-end bg-card pl-1 pb-1 rounded-bl-md">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="bg-white rounded-full mr-2"
                                                    onClick={() => viewImage(img)}
                                                >
                                                    <Maximize className="h-4 w-4" />
                                                </Button>
                                                {
                                                    images.length > 1 && <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="bg-white text-red-600 hover:text-red-700 rounded-full"
                                                        onClick={() => deleteImage(img.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                }
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}

                                {/* Add Image Button */}
                                <Card
                                    className="border-2 border-dashed hover:border-primary/50 cursor-pointer flex items-center justify-center h-40"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <CardContent className="flex flex-col items-center justify-center p-6">
                                        <Plus className="h-8 w-8 mb-2 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">Add Images</span>
                                    </CardContent>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                handleAddImages(e.target.files);
                                            }
                                        }}
                                    />
                                </Card>
                            </div>
                        </ScrollArea>
                    </div>

                    <Alert className="mt-4">
                        <AlertDescription>
                            Drag and drop images to reorder them or drop new images to add them to the gallery.
                        </AlertDescription>
                    </Alert>

                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button
                            onClick={saveChanges}
                            disabled={isLoading}
                            className="gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Single Image View Dialog */}
            <Dialog open={imageViewOpen} onOpenChange={setImageViewOpen}>
                <DialogContent className="sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>{currentImage?.alt}</DialogTitle>
                    </DialogHeader>

                    <div className="flex items-center justify-center p-4">
                        {currentImage && (
                            <img
                                src={currentImage.src instanceof File ? URL.createObjectURL(currentImage.src) : currentImage.src}
                                alt={currentImage.alt}
                                className="max-h-96 max-w-full object-contain"
                            />
                        )}
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            variant="destructive"
                            onClick={() => deleteImage(currentImage?.id as string | number)}
                            className="gap-2"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete Image
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setImageViewOpen(false)}
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
