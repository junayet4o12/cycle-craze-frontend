import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useCreateSubscribeMutation } from "@/redux/features/subscribe/subscribeApi";
import { errorMessageGenerator } from "@/utils/errorMessageGenerator";

// 1. Form validation schema
const subscribeFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// 2. Infer the type from schema
type SubscribeFormValues = z.infer<typeof subscribeFormSchema>;

// 3. Component
export default function Subscribe() {
  const [createSubscribe, { isLoading }] = useCreateSubscribeMutation();

  const form = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeFormSchema),
    defaultValues: {
      email: "",
    },
  });

  // 4. Submit handler
  const onSubmit = async (data: SubscribeFormValues) => {
    const toastId = toast.loading("Subscribing...");
    try {
      await createSubscribe(data).unwrap();
      toast.success("Subscribed successfully!", { id: toastId });
      form.reset();
    } catch (error) {
      toast.error(errorMessageGenerator(error), { id: toastId });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex">
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="rounded-r-none focus-visible:ring-0 border-r-0"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <Button
                  type="submit"
                  className="rounded-l-none bg-red-600 hover:bg-red-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "SUBSCRIBE"}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-xs text-muted-foreground">* We promise not to spam your inbox.</p>
      </form>
    </Form>
  );
}
