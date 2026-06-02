import { Suspense } from "react";
import { getUserTasks } from "../form/(tasks)/actions";
import { Task } from "../types/Task";
import FilterTabs from "./components/FilterTabs";
import TaskList from "./components/TaskList";
import TaskSkeleton from "./components/TaskSkeleton";
import WelcomePage from "./components/WelcomePage";

interface Props {
  searchParams: Promise<{ filter?: string }>;
}

export default async function Page({ searchParams }: Props) {
  const { filter: rawFilter } = await searchParams;
  const filter = rawFilter || "all";

  const { data } = await getUserTasks();
  const tasks: Task[] = data ?? [];

  return (
    <div className='max-w-6xl mx-auto p-6 space-y-8'>
      <header>
        <WelcomePage tasks={tasks} />
      </header>
      <FilterTabs activeFilter={filter} />
      <main>
        <Suspense key={filter} fallback={<TaskSkeleton />}>
          <TaskList filter={filter} />
        </Suspense>
      </main>
    </div>
  );
}
