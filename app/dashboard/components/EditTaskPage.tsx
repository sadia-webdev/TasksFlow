"use client";

import { updateTask } from "@/app/form/(tasks)/actions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Task } from "@/app/types/Task";

const priorities = ["low", "medium", "high", "urgent"];
const statuses = ["todo", "in-progress", "done", "cancelled"];

const initialMessage = {
  message: "",
  success: false,
};

export default function EditTaskPage({ task }: { task: Task }) {
  const [state, formAction, isPending] = useActionState(
    updateTask,
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
      <div className='max-w-5xl w-full p-8'>
        <div className='mb-6'>
          <h1 className='text-3xl font-semibold text-gray-900'>Edit Task</h1>
          <p className='text-sm text-gray-400 mt-0.5'>
            Update the task details below.
          </p>
        </div>

        <form action={formAction} className='space-y-5'>
          {/* hidden taskId — required by updateTask action */}
          <input type='hidden' name='taskId' value={task._id} />

          <div>
            <label className='block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5'>
              Task Title
            </label>
            <input
              name='title'
              type='text'
              defaultValue={task.title}
              placeholder='What needs to be done?'
              className='w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition'
            />
          </div>

          <div>
            <label className='block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5'>
              Description
            </label>
            <textarea
              name='description'
              defaultValue={task.description}
              placeholder='Add context, links, or notes...'
              rows={4}
              className='w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition resize-none'
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5'>
                Due Date
              </label>
              <input
                type='date'
                name='dueDate'
                defaultValue={task.dueDate?.slice(0, 10)}
                className='w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition'
              />
            </div>
            <div>
              <label className='block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5'>
                Priority
              </label>
              <select
                name='priority'
                defaultValue={task.priority}
                className='w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition appearance-none bg-white'
              >
                {priorities.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className='block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5'>
              Status
            </label>
            <select
              name='status'
              defaultValue={task.status}
              className='w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition appearance-none bg-white'
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className='mt-8'>
            <div className='flex items-center justify-end gap-3'>
              <button
                type='button'
                onClick={() => router.back()}
                className='px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={isPending}
                className='px-5 py-2 bg-gray-800 hover:bg-gray-900 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition'
              >
                {isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}