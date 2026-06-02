import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const { name, email, image } = session.user;

  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ?? "U";

  return (
    <div className=' p-8'>
      <div className='mb-8'>
        <h1 className='text-2xl font-semibold text-gray-900'>Profile</h1>
        <p className='text-sm text-gray-400 mt-0.5'>Your account details</p>
      </div>

      <div className='border border-gray-200 rounded-xl p-6 space-y-6'>
        {/* Avatar */}
        <div className='flex items-center gap-4'>
          {image ? (
            <Image
              src={image}
              alt={name ?? "User"}
              width={72}
              height={72}
              className='rounded-full object-cover'
            />
          ) : (
            <div className='w-18 h-18 rounded-full bg-primary/10 flex items-center justify-center text-xl font-semibold text-primary'>
              {initials}
            </div>
          )}
          <div>
            <p className='text-base font-medium text-gray-900'>{name}</p>
            <p className='text-sm text-gray-400'>{email}</p>
          </div>
        </div>

        <hr className='border-gray-100' />

        {/* Info rows */}
        <div className='space-y-4'>
          <div className='flex flex-col gap-1'>
            <span className='text-xs font-semibold uppercase tracking-widest text-gray-400'>
              Full Name
            </span>
            <span className='text-sm text-gray-800'>{name ?? "—"}</span>
          </div>

          <div className='flex flex-col gap-1'>
            <span className='text-xs font-semibold uppercase tracking-widest text-gray-400'>
              Email
            </span>
            <span className='text-sm text-gray-800'>{email ?? "—"}</span>
          </div>

          <div className='flex flex-col gap-1'>
            <span className='text-xs font-semibold uppercase tracking-widest text-gray-400'>
              Account Type
            </span>
            <span className='text-sm text-gray-800'>
              {image?.includes("googleusercontent")
                ? "Google"
                : "Email & Password"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
