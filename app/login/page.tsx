"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleCredentialsLogin = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    setIsPending(false);

    if (result?.error) {
      toast.error("Invalid email or password");
    } else {
      toast.success("Successfully logged in");
      router.push("/dashboard");
    }
  };

  return (
    <div className='min-h-screen bg-background flex items-center justify-center px-4'>
      <div className='w-full max-w-sm'>
        <div className='mb-8 text-center'>
          <span className='text-xl font-semibold tracking-tight text-foreground'>
            Sign in to your account
          </span>
        </div>

        <div className='bg-background border border-neutral/15 rounded-xl p-6 shadow-sm'>
          {/* Google */}
          <button
            type='button'
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className='w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg border border-neutral/20 text-[13.5px] font-medium text-foreground hover:bg-neutral/5 transition-colors duration-150'
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <div className='flex items-center gap-3 my-6'>
            <span className='flex-1 h-px bg-neutral/20'></span>
            <span className='text-[12px] text-neutral'>or</span>
            <span className='flex-1 h-px bg-neutral/20'></span>
          </div>

          <form
            onSubmit={handleCredentialsLogin}
            className='flex flex-col gap-3 mt-5'
          >
            <div className='flex flex-col gap-1.5'>
              <label
                htmlFor='email'
                className='text-[12px] font-medium text-foreground'
              >
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                placeholder='you@example.com'
                className='w-full px-3 py-2 rounded-lg border border-neutral/20 bg-background text-[13.5px] text-foreground placeholder:text-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-150'
              />
            </div>

            <div className='flex flex-col gap-1.5'>
              <label
                htmlFor='password'
                className='text-[12px] font-medium text-foreground'
              >
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                placeholder='********'
                className='w-full px-3 py-2 rounded-lg border border-neutral/20 bg-background text-[13.5px] text-foreground placeholder:text-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-150'
              />
            </div>

            <button
              type='submit'
              disabled={isPending}
              className='w-full mt-3 cursor-pointer px-4 py-2.5 rounded-lg bg-primary text-white text-[13.5px] font-medium hover:bg-primary/90 transition-colors duration-150 disabled:opacity-50'
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        <p className='text-center text-[12px] text-neutral mt-5'>
          Don&apos;t have an account?{" "}
          <Link
            href='/register'
            className='text-primary hover:underline font-medium'
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 24 24' aria-hidden>
      <path
        d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
        fill='#4285F4'
      />
      <path
        d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
        fill='#34A853'
      />
      <path
        d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z'
        fill='#FBBC05'
      />
      <path
        d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
        fill='#EA4335'
      />
    </svg>
  );
}
