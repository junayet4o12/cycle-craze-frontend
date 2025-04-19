import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { productFormSchema } from "@/schemas/product-form-schema";
import { z } from "zod";
import TextEditor from "../../editor/TextEditor";


type FormValues = z.infer<typeof productFormSchema>;
type MP_ProductFormProps = {
    form: UseFormReturn<FormValues>;
    defaultImage: string;
    isLoading: boolean;
    isImageUpload?: boolean;
};
export default function MP_ProductForm({ form, defaultImage, isLoading, isImageUpload = true }: MP_ProductFormProps) {
    const imageRef = useRef<HTMLInputElement | null>(null)
    return (
        <div className="grid gap-4">
            {
                isImageUpload && <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-32 w-36 md:h-40 md:w-44 object-cover rounded-lg">
                                        <AvatarImage src={field.value ? URL.createObjectURL(field.value) : defaultImage} alt={defaultImage} className="object-cover" />
                                        <AvatarFallback>{'/product-placeholder.png'.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <Input
                                        ref={imageRef}
                                        type="file"
                                        accept="image/*"
                                        autoComplete="image"
                                        disabled={isLoading}
                                        className="bg-gray-50 hidden"
                                        onChange={(e) => field.onChange(e.target.files?.[0])}
                                    />
                                    <Button onClick={() => imageRef.current?.click()} type="button" variant={"outline"} className="w-44">Select Image</Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            }
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bicycle Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter bicycle name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Brand</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter brand name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            {/* Price & Quantity */}
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price ($)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min="0"
                                    placeholder="Enter quantity"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            {/* Category & Frame Material */}
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Mountain">Mountain</SelectItem>
                                    <SelectItem value="Road">Road</SelectItem>
                                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                                    <SelectItem value="BMX">BMX</SelectItem>
                                    <SelectItem value="Electric">Electric</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="frameMaterial"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Frame Material</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select material" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Aluminum">Aluminum</SelectItem>
                                    <SelectItem value="Carbon">Carbon</SelectItem>
                                    <SelectItem value="Steel">Steel</SelectItem>
                                    <SelectItem value="Titanium">Titanium</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            {/* Wheel Size */}
            <FormField
                control={form.control}
                name="wheelSize"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Wheel Size (inches)</FormLabel>
                        <Select
                            onValueChange={(value) => field.onChange(parseFloat(value))}
                            value={field.value.toString()}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select wheel size" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="16">16"</SelectItem>
                                <SelectItem value="20">20"</SelectItem>
                                <SelectItem value="24">24"</SelectItem>
                                <SelectItem value="26">26"</SelectItem>
                                <SelectItem value="27.5">27.5"</SelectItem>
                                <SelectItem value="29">29"</SelectItem>
                                <SelectItem value="700">700c (Road)</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Description */}
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <TextEditor value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}