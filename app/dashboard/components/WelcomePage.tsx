
import { Task } from "@/app/types/Task";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const WelcomePage = ({tasks}: {tasks: Task[]}) => {

  return (
    <div className='p-8 rounded-xl flex justify-between items-center bg-linear-to-r from-primary to-secondary text-white'>
      <div className='py-2'>
        <h1 className='text-3xl font-bold  tracking-tight'>
          Productivity Dashboard
        </h1>
        <p className=' mt-1 text-md text-gray-300'>
          Welcome back, You have {tasks.length} tasks to complete today.
        </p>
      </div>
      {/* add task  */}
      <Link
        href='/dashboard/tasks/add-task'
        className='bg-white text-primary hover:bg-gray-100 font-bold py-2 px-4 rounded-lg transition'
      >
        <div className='flex gap-1 items-center'>
          <Plus size={15} />
          <span>Add Task</span>
        </div>
      </Link>
    </div>
  );
};

export default WelcomePage;
