import {
    Form,
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Plus, Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useState } from "react";
import { productFormSchema } from "@/schemas/product-form-schema";
import MP_ProductForm from "./MP_ProductForm";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { IProduct } from "@/types";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { errorMessageGenerator } from "@/utils/errorMessageGenerator";
// Form schema (simplified - without images and specifications)

// Component
export default function AddProduct() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [createProducts, { isLoading }] = useCreateProductMutation()
    const form = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            name: "",
            brand: "",
            price: 0,
            category: "Mountain",
            frameMaterial: "Aluminum",
            wheelSize: 26,
            quantity: 0,
            description: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof productFormSchema>) => {
        const toastId = toast.loading('Product is creating...');

        const productNewData: Omit<IProduct, '_id'> = {
            brand: data.brand,
            price: data.price,
            category: data.category,
            description: data.description,
            frameMaterial: data.frameMaterial,
            images: [],
            name: data.name,
            quantity: data.quantity,
            specifications: [],
            wheelSize: data.wheelSize,
        }

        try {
            const imageUrl = await uploadImageToCloudinary(data.image);
            if (!imageUrl) {
                throw new Error('Something went wrong when the image is uploading!!')
            }
            productNewData.images = [imageUrl];


            await createProducts(productNewData).unwrap();
            toast.success('Product created successfully!', { id: toastId, duration: 2000 });
            form.reset()
            setIsDialogOpen(false)
        } catch (err) {
            console.error(err);
            toast.error(errorMessageGenerator(err), { id: toastId });
        }
    };

    const handleCancel = () => {
        form.reset();
        setIsDialogOpen(false);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Bicycle
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[700px] ">
                <DialogHeader>
                    <DialogTitle>Add New Bicycle</DialogTitle>
                    <DialogDescription>
                        Fill in the details to add a new bicycle to your inventory.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <MP_ProductForm form={form} defaultImage="/product-placeholder.png" isLoading={isLoading} />

                        {/* Footer */}
                        <DialogFooter className="pt-2 flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isLoading}
                                onClick={handleCancel}
                                className="flex items-center gap-1"
                            >
                                <X size={16} />
                                Cancel
                            </Button>
                            <Button
                                disabled={isLoading}
                                type="submit" className="flex items-center gap-1">
                                <Save size={16} />
                                Add Bicycle
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}