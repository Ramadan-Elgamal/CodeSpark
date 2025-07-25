'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
});

type AuthFormProps = {
  mode: 'login' | 'signup';
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Mock authentication
    console.log(values);
    toast({
      title: mode === 'login' ? 'Login Successful' : 'Account Created',
      description: "You're being redirected to your dashboard.",
    });
    router.push('/dashboard');
  };

  const isLogin = mode === 'login';

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Link href="/" className="flex items-center justify-center" prefetch={false}>
              <Logo className="h-8 w-8 text-primary" />
              <span className="font-headline ml-2 text-2xl font-semibold">CodeSpark AI</span>
            </Link>
          </div>
          <CardTitle className="font-headline text-2xl">{isLogin ? 'Welcome Back' : 'Create an Account'}</CardTitle>
          <CardDescription>{isLogin ? 'Sign in to continue to your dashboard.' : 'Enter your details to get started.'}</CardDescription>
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
                      <Input placeholder="name@example.com" {...field} />
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
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {isLogin ? 'Login' : 'Create Account'}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            {isLogin ? (
              <>
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="underline">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link href="/login" className="underline">
                  Login
                </Link>
              </>
            )}
          </div>
          <Separator className="my-4" />
          <Button variant="outline" className="w-full" onClick={() => onSubmit({email: 'user@google.com', password:'password'})}>
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 62.3l-66.5 64.6C305.5 102.6 268.9 96 248 96c-106.1 0-192 85.9-192 192s85.9 192 192 192c94.2 0 165.3-64.5 180.4-150.2H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>
            Sign {isLogin ? 'in' : 'up'} with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
