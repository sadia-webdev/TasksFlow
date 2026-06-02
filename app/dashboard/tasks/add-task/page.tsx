"use client";

import { createTask } from "@/app/form/(tasks)/actions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialMessage = {
  message: "",
  success: false,
};


const priorities = ["low", "medium", "high", "urgent"];
const statuses = ["todo", "in-progress", "done", "cancelled"];

export default function EssentialTaskPage() {
  const [state, formAction, isPending] = useActionState(
    createTask,
    initialMessage,
  );

  const router = useRouter();

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);

      setTimeout(() => {
        router.push("/dashboard/tasks");
      }, 1200);
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className='min-h-screen flex items-center justify-center p-6'>
      <div className='max-w-5xl w-full  p-8'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-3xl font-semibold text-gray-900'>
            Essential Task
          </h1>
          <p className='text-sm text-gray-400 mt-0.5'>
            Define the core objective without clutter.
          </p>
        </div>

        <form action={formAction} className='space-y-5'>
          {/* Task Title */}
          <div>
            <label className='block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5'>
              Task Title
            </label>
            <input
              name='title'
              type='text'
              placeholder='What needs to be done?'
              className='w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition'
            />
          </div>

          {/* Description */}
          <div>
            <label className='block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5'>
              Description
            </label>
            <textarea
              name='description'
              placeholder='Add context, links, or notes...'
              rows={4}
              className='w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition resize-none'
            />
          </div>

          {/* Due Date + Priority */}
          <div className='grid grid-cols-2 gap-4'>
            {/* DUE DATE  */}
            <div>
              <label className='block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5'>
                Due Date
              </label>
              <input
                type='date'
                name='dueDate'
                className='w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition'
              />
            </div>
              {/* PRIORITY */}
            <div>
              <label className='block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5'>
                Priority
              </label>
              <select
                name='priority'
                className='w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition appearance-none bg-white'
              >
                {priorities.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className='block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5'>
              Status
            </label>
            <select
              name='status'
              className='w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition appearance-none bg-white'
            >
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        {/* Footer */}
        <div className='mt-8'>
          <div className='flex items-center justify-end gap-3'>
            <button className='px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition'>
              Cancel
            </button>
            <button className='px-5 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded-lg transition'>
              {isPending ? "Creating..." : "Create Task"}
            </button>
          </div>
        </div>
        </form>

      </div>
    </div>
  );
}
