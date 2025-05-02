import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { TUserData } from "@/types";
type PropsType = {
  form: UseFormReturn<{
    name: string;
    contactNumber: string;
    address?: string | undefined;
    profileImage?: File | undefined;
  }, any, undefined>;
  userData: TUserData;
  isLoading: boolean;
}
export default function EditUserFormUi({ form, userData, isLoading }: PropsType) {
  const selectProfileRef = useRef<HTMLInputElement | null>(null)
  return (
    <div className="flex flex-col sm:flex-row gap-6">
      <FormField
        control={form.control}
        name="profileImage"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex flex-col items-center gap-2">
                <Avatar className="w-24 h-24 object-cover">
                  <AvatarImage src={field.value ? URL.createObjectURL(field.value) : (userData.profile || '/default-user.png')} alt={userData.name} className="object-cover" />
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
                <Button onClick={() => selectProfileRef.current?.click()} type="button" variant={"outline"} className="w-full sm:w-44">Select Image</Button>
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
  );
}