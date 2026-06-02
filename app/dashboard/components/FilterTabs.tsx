"use client";

import { useRouter, usePathname } from "next/navigation";

const tabs = [
  { key: "all", label: "All" },
  { key: "todo", label: "To Do" },
  { key: "in-progress", label: "In Progress" },
  { key: "done", label: "Done" },
];

export default function FilterTabs({ activeFilter }: { activeFilter: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = (key: string) => {
    router.push(`${pathname}?filter=${key}`);
  };

  return (
    <div className='flex gap-2 border-b border-gray-200 pb-3'>
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => handleFilter(key)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeFilter === key
              ? "bg-gray-900 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
