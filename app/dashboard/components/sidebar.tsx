"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
  Contact,
  CircleDivideIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";


import { useSession } from "next-auth/react";
import Image from "next/image";


const nameSkeleton = (
  <span className='inline-block w-20 h-3 bg-neutral/10 rounded animate-pulse' />
);
const emailSkeleton = (
  <span className='inline-block w-28 h-2 mt-2 bg-neutral/10 rounded animate-pulse' />
);

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
  { label: "profile", href: "/dashboard/profile", icon: Contact },
  { label: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {


 const { data: session } = useSession();

 const username = session?.user?.name || ""; 
 const email = session?.user?.email || "";
 const image = session?.user?.image;

 // initials 
 const initials = username
   .split(" ")
   .map((n) => n[0])
   .join("")
   .toUpperCase()
   .slice(0, 2);


  const pathname = usePathname();

  return (
    <aside className='w-55 h-screen flex flex-col bg-background border-r border-neutral/15 sticky top-0'>
      {/* Logo */}
      <div className='px-5 py-5 border-b border-neutral/15'>
        <span className='text-[15px] font-semibold tracking-tight text-foreground'>
          TaskFlow
        </span>
      </div>

      {/* User */}
      <div className='flex items-center gap-2.5 px-4 py-3.5 border-b border-neutral/15'>
        <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary shrink-0 overflow-hidden'>
                {image ? (
                  <Image
                    src={image}
                    alt={username}
                    width={32}
                    height={32}
                    className='w-full h-full object-cover rounded-full'
                  />
                ) : (
                  initials
                )}
        </div>
        <div className='overflow-hidden'>
          <div className='text-[13px] font-medium text-foreground truncate'>
            {username || nameSkeleton}
          </div>
          <div className='text-[11px] text-neutral truncate'>{email || emailSkeleton}</div>
        </div>
      </div>

      {/* Nav */}
      <nav className='flex-1 flex flex-col gap-0.5 p-2.5 overflow-y-auto'>
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] transition-colors duration-150 ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-neutral hover:bg-neutral/8 hover:text-foreground"
              }`}
            >
              <Icon size={16} aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className='flex flex-col gap-0.5 p-2.5 border-t border-neutral/15'>
        <Link
          href='/help'
          className='flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] text-neutral hover:bg-neutral/8 hover:text-foreground transition-colors duration-150'
        >
          <HelpCircle size={16} aria-hidden />
          Help center
        </Link>
        <div className='flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] text-neutral hover:bg-neutral/8 hover:text-foreground transition-colors duration-150'>
          <LogOut size={16} aria-hidden />

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className='text-red-500'
            type='button'
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
