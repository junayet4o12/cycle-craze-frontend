import { useUpdateUserMutation } from "@/redux/features/user/userApi";
import { TUserData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import EditUserFormUi from "@/components/edit-user-form-ui";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { toast } from "sonner";
import { errorMessageGenerator } from "@/utils/errorMessageGenerator";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { Form } from "@/components/ui/form";
const formSchema = z.object({
    name: z.string({ required_error: 'Please enter your name!!' }),
    address: z.string().optional(),
    contactNumber: z.string({ required_error: "Enter a valid contact number" })
        .regex(/^\+?[0-9]{10,14}$/, {
            message: "Contact number must be 10-14 digits (with optional +)",
        }),
    profileImage: z
        .custom<File | undefined>((file) => {
            if (!file) return true; // optional, no file uploaded is OK
            return (
                file instanceof File &&
                file.size > 0 &&
                ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)
            );
        }, {
            message: "Profile image must be a valid image file (jpg, jpeg, png, webp)",
        })
        .optional(),
});
type FormValues = {
    name: string;
    contactNumber: string;
    address?: string;
    profileImage?: File | undefined;
};
type UserDataType = {
    name: string;
    contactNumber: string;
    address?: string;
    profile?: string;
}

type PropTypes = {
    userData: TUserData;
    setIsOpen: Dispatch<SetStateAction<boolean>>
}
export default function MU_SU_EditForm({ userData, setIsOpen }: PropTypes) {
    const [updateMyData, { isLoading }] = useUpdateUserMutation()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: userData.name || '',
            address: userData.address || '',
            contactNumber: userData.contactNumber || '',
            profileImage: undefined,
        },
    });

    const onSubmit = async (formData: FormValues) => {
        const toastId = toast.loading('User Data is updating...');
        const userNewData: UserDataType = {
            name: formData.name,
            address: formData?.address,
            contactNumber: formData.contactNumber,
            profile: userData.profile || ''

        };

        try {
            if (formData.profileImage) {
                const imageUrl = await uploadImageToCloudinary(formData.profileImage);
                if (imageUrl) {
                    userNewData.profile = imageUrl
                }
            }

            await updateMyData({ userId: userData._id, updatedData: userNewData }).unwrap();
            toast.success('User updated successfully!', { id: toastId, duration: 2000 });
            setIsOpen(false);
        } catch (err) {
            console.error(err);
            toast.error(errorMessageGenerator(err), { id: toastId });
        }
    };
    const handleCancel = () => {
        setIsOpen(false);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <EditUserFormUi form={form} isLoading={isLoading} userData={userData} />
                <CardFooter className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={handleCancel}
                        className="flex items-center gap-1"
                    >
                        <X size={16} />
                        Cancel
                    </Button>
                    <Button
                        className="flex items-center gap-1"
                        disabled={isLoading}
                    >
                        <Save size={16} />
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </CardFooter>
            </form>
        </Form>
    );
}