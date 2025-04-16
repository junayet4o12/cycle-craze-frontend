
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateProductMutation } from "@/redux/features/product/productApi";
import { IProduct, TSpecification } from "@/types";
import { Plus, Save, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import MP_SingleSpecification from "./MP_SingleSpecification";
import { toast } from "sonner";
import { errorMessageGenerator } from "@/utils/errorMessageGenerator";
type PropTypes = {
    isDialogOpen: boolean;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
    product: IProduct;
}
export default function MP_EditSpecification({ isDialogOpen, setIsDialogOpen, product }: PropTypes) {
    const incomingSpecifications = product.specifications.map((item, idx) => ({
        ...item,
        id: idx
    }))
    const [allSpecifications, setAllSpecifications] = useState<(TSpecification & { id: string | number })[] | []>(incomingSpecifications);
    const [updateProduct, { isLoading }] = useUpdateProductMutation()
    const handleCancel = () => {
        setAllSpecifications(incomingSpecifications)
        setIsDialogOpen(false)
    };

    const handleSave = async () => {
        const toastId = toast.loading('Specifications is updating...');
        const newSpecifications = allSpecifications.map(item => ({
            key: item.key,
            value: item.value
        }))
        try {
            await updateProduct({ productId: product._id, updatedData: { specifications: newSpecifications } }).unwrap();
            toast.success('Specifications updated successfully!', { id: toastId, duration: 2000 });
            setIsDialogOpen(false)
        } catch (err) {
            console.error(err);
            toast.error(errorMessageGenerator(err), { id: toastId });
        }
    }

    const handleAddSpec = () => {
        const newSpec = {
            key: '',
            value: '',
            id: Date.now()
        }
        setAllSpecifications([...allSpecifications, newSpec])
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[700px] ">
                <DialogHeader>
                    <DialogTitle>Edit Specification</DialogTitle>
                </DialogHeader>
                <DialogDescription>

                    <div className="space-y-4 mb-4">

                        {
                            allSpecifications.length > 0 ? <div className="grid grid-cols-3 gap-2 text-sm">
                                <p>Spec Name</p>
                                <p>Spec Details</p>
                            </div> : <p>No Specifications available!!</p>
                        }
                        {
                            allSpecifications.map((item) => <MP_SingleSpecification key={item.id} spec={item} specifications={allSpecifications} setAllSpecifications={setAllSpecifications} />)
                        }
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isLoading}
                        onClick={handleAddSpec}
                        className="flex items-center gap-1 mx-auto"
                    >
                        <Plus size={16} />
                        Add Spec
                    </Button>
                </DialogDescription>
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
                        onClick={handleSave}
                        disabled={isLoading}
                        type="submit" className="flex items-center gap-1">
                        <Save size={16} />
                        Save Spec
                    </Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    );
}