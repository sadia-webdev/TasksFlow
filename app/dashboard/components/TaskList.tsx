import { getUserTasks } from "@/app/form/(tasks)/actions";
import { Task } from "@/app/types/Task";
import Menu from "./Menu";

export default async function TaskList({ filter }: { filter: string }) {
  const { data } = await getUserTasks();
  const allTasks: Task[] = data ?? [];

  const tasks =
    filter === "all"
      ? allTasks
      : allTasks.filter((task) => task.status === filter);

  return (
    <div>
      {tasks.length === 0 ? (
        <p className='text-gray-500'>No tasks found.</p>
      ) : (
        <ul className='gap-4 grid grid-cols-4'>
          {tasks.map((task: Task) => (
            <li
              key={task._id}
              className='border border-gray-300 p-4 rounded-lg shadow-md'
            >
              <div className='flex justify-between items-start'>
                <div className='space-y-2'>
                  <h2 className='text-lg font-semibold'>{task.title}</h2>
                  <p className='text-gray-600'>{task.description}</p>
                  <p className='text-sm text-gray-500'>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                  <div
                    className={`inline-block px-2 py-1 rounded-lg mt-2 ${
                      task.priority === "high"
                        ? "bg-red-100"
                        : task.priority === "medium"
                          ? "bg-yellow-100"
                          : "bg-green-100"
                    }`}
                  >
                    <span
                      className={
                        task.priority === "high"
                          ? "text-red-500"
                          : task.priority === "medium"
                            ? "text-yellow-500"
                            : "text-green-500"
                      }
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
                <Menu task={task} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
