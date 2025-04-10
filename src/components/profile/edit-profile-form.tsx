import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Save, X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useUpdateMyDataMutation } from "@/redux/features/user/userApi";
import { errorMessageGenerator } from "@/utils/errorMessageGenerator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { TUserData } from "@/types";
import { Dispatch, SetStateAction, useRef } from "react";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";

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
    setIsEditing: Dispatch<SetStateAction<boolean>>
}

export default function EditProfileForm({ userData, setIsEditing }: PropTypes) {
    const [updateMyData, { isLoading, isError }] = useUpdateMyDataMutation()
    const selectProfileRef = useRef<HTMLInputElement | null>(null)
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

            await updateMyData(userNewData).unwrap();
            toast.success('Profile updated successfully!', { id: toastId, duration: 2000 });
            setIsEditing(false);
        } catch (err) {
            console.error(err);
            toast.error(errorMessageGenerator(err), { id: toastId });
        }
    };
    const handleCancel = () => {
        setIsEditing(false);
    };
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                        <FormField
                            control={form.control}
                            name="profileImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex flex-col items-center gap-2">
                                            <Avatar className="w-24 h-24 object-cover">
                                                <AvatarImage src={field.value ? URL.createObjectURL(field.value) : (userData.profile || '/public/default-user.png')} alt={userData.name} className="object-cover" />
                                                <AvatarFallback>{userData?.name?.substring(0, 2)?.toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <Label htmlFor="profile">Upload Profile Image</Label>
                                            <Input
                                                ref={selectProfileRef}
                                                type="file"
                                                accept="image/*"
                                                autoComplete="profileImage"
                                                disabled={isLoading}
                                                className="bg-gray-50 hidden"
                                                onChange={(e) => field.onChange(e.target.files?.[0])}
                                            />
                                            <Button onClick={()=> selectProfileRef.current?.click()} type="button" variant={"outline"} className="w-full sm:w-44">Select Image</Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex-1 space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Name"
                                                type="text"
                                                autoComplete="name"
                                                disabled={isLoading}
                                                className="bg-gray-50"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="contactNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contact Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Contact Number"
                                                type="text"
                                                autoComplete="contactNumber"
                                                disabled={isLoading}
                                                className="bg-gray-50"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Address"
                                                autoComplete="address"
                                                disabled={isLoading}
                                                className="bg-gray-50"
                                                {...field}
                                                rows={3}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <CardFooter className="flex justify-end gap-2">
                        <Button
                            variant="outline"
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

        </>
    );
}