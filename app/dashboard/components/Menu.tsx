"use client";
import { Edit, EllipsisVertical, Trash } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useActionState } from "react";
import { deleteTask } from "@/app/form/(tasks)/actions";
import { Task } from "@/app/types/Task";

const initialMessage = { message: "", success: false };

const Menu = ({ task }: { task: Task }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    deleteTask,
    initialMessage,
  );

  return (
    <div className='flex justify-end gap-2 mt-1 place-items-start'>
      <div className='relative'>
        <EllipsisVertical
          className='text-gray-400 cursor-pointer'
          onClick={() => setMenuOpen(!menuOpen)}
        />

        {menuOpen && (
          <div className='absolute text-center right-0 mt-2 w-fit bg-white border border-gray-200 rounded-md shadow-lg z-10'>
            {/* Edit */}
            <button className='block w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-100'>
              <Link
                href={`/dashboard/tasks/${task._id}/edit`}
                className='flex gap-1'
              >
                <Edit size={20} />
                Edit
              </Link>
            </button>

            {/* Delete */}
            <form action={formAction}>
              <input type='hidden' name='taskId' value={task._id.toString()} />
              <button
                type='submit'
                disabled={isPending}
                className='flex gap-1 w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-100 disabled:opacity-50'
              >
                <Trash size={20} />
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
