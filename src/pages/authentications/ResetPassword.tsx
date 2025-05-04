import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useResetPasswordMutation } from '@/redux/features/auth/authApi';
import { Link, useLocation } from 'react-router-dom';
import { passwordValidation } from '@/schemas/password-validation';
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/features/auth/authSlice';
import { useState } from 'react';
import PassShowingToggler from '@/components/pass-showing-toggler';

// Define the form schema with zod
const formSchema = z.object({
    newPassword: passwordValidation,
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Path of the field to which the error is attached
});

// Create a type from the schema
type FormValues = z.infer<typeof formSchema>;

export default function ResetPassword() {
    const [showNewPass, setShowNewPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();
    const location = useLocation();
    const dispatch = useAppDispatch()
    // Get the token from the URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const email = queryParams.get('email');
    dispatch(setUser({ user: {}, token: token || '' }))
    // Initialize form with TypeScript types
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    // Form submission handler
    const onSubmit = async (data: FormValues) => {
        if (!token) {
            toast.error('Reset token is missing. Please use the link from your email.');
            return;
        }
        if (!email) {
            toast.error('User Email is missing. Please use the link from your email.');
            return;
        }


        const toastId = toast.loading('Resetting your password...');
        const passwordChangingData = {
            newPassword: data.newPassword,
            email
        }
        try {
            // Only send the newPassword and token to the backend
            await resetPassword(passwordChangingData).unwrap();

            toast.success('Password has been reset successfully!', { id: toastId, duration: 2000 });
        } catch {

            toast.error('Failed to reset password. The link may have expired.', { id: toastId });
        }
    };

    return (
        <Card className="w-full max-w-lg border-0 shadow-none bg-card md:bg-transparent">
            {!isSuccess ? (
                <>
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-center mb-2">
                            <CardTitle className="text-2xl font-bold text-primary">Reset Password</CardTitle>
                        </div>
                        <CardDescription className="text-center text-gray-700 dark:text-muted-foreground">
                            Create a new password for your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                               <div className='flex gap-2'>
                                                    <Input
                                                        placeholder={`${showNewPass ? 'New Password' : '*******'}`}
                                                        type={`${showNewPass ? 'text' : 'password'}`}
                                                        autoComplete="new-password"
                                                        disabled={isLoading}
                                                        className="bg-gray-50"
                                                        {...field}
                                                    />
                                                     <PassShowingToggler showPass={showNewPass} setShowPass={setShowNewPass} />
                                               </div>
                                            </FormControl>
                                            <FormMessage />
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                Password must be at least 8 characters with uppercase, lowercase,
                                                number and special character.
                                            </p>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                               <div className='flex gap-2'>
                                                    <Input
                                                       placeholder={`${showConfirmPass ? 'Confirm Password' : '*******'}`}
                                                       type={`${showConfirmPass ? 'text' : 'password'}`}
                                                        autoComplete="new-password"
                                                        disabled={isLoading}
                                                        className="bg-gray-50"
                                                        {...field}
                                                    />
                                                     <PassShowingToggler showPass={showConfirmPass} setShowPass={setShowConfirmPass} />
                                               </div>
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
                                            Resetting Password...
                                        </>
                                    ) : (
                                        "Reset Password"
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </>
            ) : (
                <>
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-center mb-4">
                            <CheckCircle className="h-12 w-12 text-green-500" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-primary text-center">
                            Password Reset Complete
                        </CardTitle>
                        <CardDescription className="text-center text-gray-700 dark:text-muted-foreground">
                            Your password has been updated successfully
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center space-y-3 py-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Your password has been changed successfully. You can now use your new
                                password to log in to your account.
                            </p>
                        </div>

                        <Button
                            variant="default"
                            className="w-full"
                            asChild
                        >
                            <Link to="/auth/login">
                                Go to Login
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </>
            )}
            <CardFooter className="flex flex-col space-y-2 border-t pt-6">
                {!isSuccess && (
                    <p className="text-sm text-center text-gray-700 dark:text-muted-foreground">
                        Remember your password? <Link to={'/auth/login'} className="text-primary font-medium hover:underline">Back to login</Link>
                    </p>
                )}
                <div className="flex items-center justify-center text-xs text-gray-700 dark:text-muted-foreground">
                    <span>Secure reset</span>
                    <span className="mx-2">•</span>
                    <span>Privacy protected</span>
                </div>
            </CardFooter>
        </Card>
    );
}