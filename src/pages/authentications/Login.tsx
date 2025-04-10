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
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { verifyToken } from '@/utils/verifyToken';
import { TUser } from '@/types';
import { setUser } from '@/redux/features/auth/authSlice';
import { errorMessageGenerator } from '@/utils/errorMessageGenerator';
import { useState } from 'react';
import PassShowingToggler from '@/components/pass-showing-toggler';

// Define the form schema with zod
const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

// Create a type from the schema
type FormValues = z.infer<typeof formSchema>;

export default function Login() {
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation()
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate()
    // Initialize form with TypeScript types
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Form submission handler
    const onSubmit = async (data: FormValues) => {
        const toastId = toast.loading('Logging in...');

        try {
            const res = await login(data).unwrap();
            const user = verifyToken(res.data.accessToken) as TUser
            dispatch(setUser({
                user,
                token: res.data.accessToken
            }))
            toast.success('Logged in successfully!', { id: toastId, duration: 2000 })
            navigate('/')
        } catch (err) {
            toast.error(errorMessageGenerator(err), { id: toastId });
        }
    };

    return (
        <Card className="w-full max-w-lg border-0 shadow-none bg-card md:bg-transparent">
            <CardHeader className="space-y-1">
                <div className="flex items-center justify-center mb-2">
                    <CardTitle className="text-2xl font-bold text-primary">Login</CardTitle>
                </div>
                <CardDescription className="text-center text-muted-foreground ">
                    Sign in to access your cycling account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                                autoComplete="current-password"
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

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm  text-muted-foreground">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <Link to={'/auth/forgot-password'} className="font-medium text-primary hover:text-primary/80">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 border-t pt-6">
                <p className="text-sm text-center text-muted-foreground">
                    Don't have an account? <Link to={'/auth/sign-up'} className="text-primary font-medium hover:underline">Sign up</Link>
                </p>
                <div className="flex items-center justify-center text-xs text-muted-foreground">
                    <span>Secure login</span>
                    <span className="mx-2">•</span>
                    <span>Privacy protected</span>
                </div>
            </CardFooter>
        </Card>
    );
}