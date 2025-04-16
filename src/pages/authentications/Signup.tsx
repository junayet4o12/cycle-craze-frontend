import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAppDispatch } from '@/redux/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { verifyToken } from '@/utils/verifyToken';
import { TUser } from '@/types';
import { setUser } from '@/redux/features/auth/authSlice';
import { useSignupMutation } from '@/redux/features/auth/authApi';
import { errorMessageGenerator } from '@/utils/errorMessageGenerator';
import { passwordValidation } from '@/schemas/password-validation';
import PassShowingToggler from '@/components/pass-showing-toggler';
import { useState } from 'react';

// Define the form schema with zod
const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: passwordValidation,
    contactNumber: z.string().min(10, { message: "Please enter a valid contact number" })
});

// Create a type from the schema
type FormValues = z.infer<typeof formSchema>;

export default function SignUp() {
    const [showPass, setShowPass] = useState(false)
    const dispatch = useAppDispatch();
    const [signUp, { isLoading }] = useSignupMutation()
    const navigate = useNavigate()
    // Initialize form with TypeScript types
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            contactNumber: ""
        },
    });

    // Form submission handler
    const onSubmit = async (data: FormValues) => {
        const toastId = toast.loading('Creating your account...');

        try {
            const res = await signUp(data).unwrap();
            const user = verifyToken(res.data.accessToken) as TUser
            dispatch(setUser({
                user,
                token: res.data.accessToken
            }))
            toast.success('Account created successfully!', { id: toastId, duration: 2000 })
            navigate('/'); // Redirect to dashboard after signup
        } catch (err) {

            toast.error(errorMessageGenerator(err), { id: toastId });
        }
    };

    return (
        <Card className="w-full max-w-lg border-0 shadow-none bg-card md:bg-transparent">
            <CardHeader className="space-y-1">
                <div className="flex items-center justify-center mb-2">
                    <CardTitle className="text-2xl font-bold text-primary">Sign Up</CardTitle>
                </div>
                <CardDescription className="text-center text-gray-700 dark:text-muted-foreground">
                    Create your cycling account today
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="your.email@example.com"
                                            type="email"
                                            autoComplete="email"
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className='flex gap-2'>
                                            <Input
                                                placeholder={`${showPass ? 'Password' : '*******'}`}
                                                type={`${showPass ? 'text' : 'password'}`}
                                                autoComplete="new-password"
                                                disabled={isLoading}
                                                className="bg-gray-50"
                                                {...field}
                                            />
                                            <PassShowingToggler showPass={showPass} setShowPass={setShowPass} />
                                        </div>
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
                                            placeholder="+1 (123) 456-7890"
                                            type="tel"
                                            autoComplete="tel"
                                            disabled={isLoading}
                                            className="bg-gray-50"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 border-t pt-6">
                <p className="text-sm text-center text-gray-700 dark:text-muted-foreground">
                    Already have an account? <Link to={'/auth/login'} className="text-primary font-medium hover:underline">Login</Link>
                </p>
                <div className="flex items-center justify-center text-xs text-gray-700 dark:text-muted-foreground">
                    <span>Secure signup</span>
                    <span className="mx-2">•</span>
                    <span>Privacy protected</span>
                </div>
            </CardFooter>
        </Card>
    );
}