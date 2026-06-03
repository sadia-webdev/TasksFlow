"use client";
import Link from "next/link";
import { register } from "../form/actions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const initialMessage = {
  message: "",
  success: false,

};


export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(register, initialMessage);



  const router = useRouter();

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className='min-h-screen bg-background flex items-center justify-center px-4'>
      <div className='w-full max-w-sm'>
        {/* Logo */}
        <div className='mb-8 text-center'>
          <span className='text-xl font-semibold tracking-tight text-foreground'>
            Create a new account
          </span>
        </div>

        {/* Card */}
        <div className='bg-background border border-neutral/15 rounded-xl p-6 shadow-sm'>
          <form action={formAction} className='flex flex-col gap-3'>
            {/* name */}
            <div className='flex flex-col gap-1.5'>
              <label
                htmlFor='name'
                className='text-[12px] font-medium text-foreground'
              >
                name
              </label>
              <input
                id='name'
                name='name'
                type='text'
                autoComplete='name'
                placeholder='John Deo'
                className='w-full px-3 py-2 rounded-lg border border-neutral/20 bg-background text-[13.5px] text-foreground placeholder:text-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-150'
              />
            </div>

            {/* Email */}
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

            {/* Password */}
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
              className='w-full mt-1 px-4 py-2.5 rounded-lg bg-primary text-white text-[13.5px] font-medium hover:bg-primary/90 transition-colors duration-150'
            >
              {isPending ? "Registering..." : "Register" }
            </button>
          </form>
        </div>

        {/* Sign in */}
        <p className='text-center text-[12px] text-neutral mt-5'>
          Already have an account?{" "}
          <Link
            href='/login'
            className='text-primary hover:underline font-medium'
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
