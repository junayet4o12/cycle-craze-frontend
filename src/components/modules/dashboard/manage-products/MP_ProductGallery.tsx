import { useState, useRef, Dispatch, SetStateAction, useEffect } from 'react';
import { Plus, Save, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUpdateProductMutation } from '@/redux/features/product/productApi';
import { toast } from 'sonner';
import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';
import { errorMessageGenerator } from '@/utils/errorMessageGenerator';
import { ImageType } from '@/types';
import MP_PG_SingleImage from './MP_PG_SingleImage';

type PropsType = {
    images: string[];
    isDialogOpen: boolean;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
    productId: string;
};
import { useDropzone } from 'react-dropzone'
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core'
import {
    SortableContext,
    arrayMove,
    rectSortingStrategy,
} from '@dnd-kit/sortable'


export default function MP_ProductGallery({ images: incomingImages, isDialogOpen, setIsDialogOpen, productId }: PropsType) {
    const [updateProduct, { isLoading }] = useUpdateProductMutation()
    const [isImageUploading, setIsImageUploading] = useState(false)
    const [images, setImages] = useState<ImageType[]>(
        incomingImages.map((url) => ({ id: url, src: url, alt: 'Product image' }))
    )
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const closeModal = () => {
        setIsDialogOpen(false)
    };
    useEffect(() => {
        setImages(incomingImages.map((url) => ({ id: url, src: url, alt: 'Product image' })))
    }, [incomingImages, isDialogOpen])
    const onDropFiles = (files: File[]) => {
        const newOnes: ImageType[] = files.map((file, i) => ({
            id: Date.now() + i,
            src: file,
            alt: file.name,
        }))
        setImages((prev) => [...prev, ...newOnes])
    }
    const { getRootProps } = useDropzone({
        onDrop: onDropFiles,
        accept: { 'image/*': [] },
        multiple: true,
    })
    const sensors = useSensors(useSensor(PointerSensor))
    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e
        if (over && active.id !== over.id) {
            setImages((items) => {
                const oldIdx = items.findIndex((i) => i.id === active.id)
                const newIdx = items.findIndex((i) => i.id === over.id)
                return arrayMove(items, oldIdx, newIdx)
            })
        }
    }
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

    const saveChanges = async () => {
        if (images.length < 1) {
            toast.error('Keep at least one image!');
            return;
        }


        const newImageUrls = [];
        setIsImageUploading(true)
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
        setIsImageUploading(false)
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


    return (
        <Dialog
            open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent
                {...getRootProps()}
                className={`rounded-lg sm:max-w-4xl max-h-screen flex flex-col`}
            >
                <DialogHeader>
                    <DialogTitle>Product Gallery</DialogTitle>
                </DialogHeader>




                <ScrollArea className="h-96 w-full px-1">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext items={images.map((i) => i.id)} strategy={rectSortingStrategy}>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
                                {images.map((img) => (
                                    <MP_PG_SingleImage key={img.id} image={img} images={images} setImages={setImages} />
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
                        </SortableContext>
                    </DndContext>
                </ScrollArea>

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
                        disabled={isLoading || isImageUploading}
                        className="gap-2"
                    >
                        {(isLoading || isImageUploading) ? (
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
        </Dialog >
    );
}
