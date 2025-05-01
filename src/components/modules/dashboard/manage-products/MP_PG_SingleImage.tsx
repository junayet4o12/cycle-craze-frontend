// MP_PG_SingleImage.tsx
import { ImageType } from '@/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Trash2, Maximize } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type Props = {
    image: ImageType
    images: ImageType[]
    setImages: Dispatch<SetStateAction<ImageType[]>>
}

export default function MP_PG_SingleImage({ image, images, setImages }: Props) {
    const { attributes, listeners, setNodeRef, transform, transition, isOver } =
        useSortable({ id: image.id })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition: isOver ? transition : undefined,
    }

    const deleteImage = () => {
        if (images.length > 1) {
            setImages(images.filter((i) => i.id !== image.id))
        }
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}

            className="relative bg-white rounded-lg overflow-hidden shadow"
        >
            <img
                {...listeners}
                src={typeof image.src === 'string' ? image.src : URL.createObjectURL(image.src)}
                alt={image.alt}
                className="w-full h-40 object-cover"
            />

            <div className="absolute top-2 right-2 flex space-x-1">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className='bg-white hover:bg-white' size="icon">
                            <Maximize className="h-4 w-4 text-black" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader />
                        <img
                            src={typeof image.src === 'string' ? image.src : URL.createObjectURL(image.src)}
                            alt={image.alt}
                            className="max-h-[80vh] object-contain w-full"
                        />
                        <DialogFooter>
                            <DialogClose>
                                <Button>Close</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Button
                    size="icon"
                    onClick={deleteImage}
                    className="text-red-600 hover:text-red-800 bg-white hover:bg-white'"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
