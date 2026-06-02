import { Suspense } from "react";
import TaskList from "../components/TaskList";
import TaskSkeleton from "../components/TaskSkeleton";

interface Props {
  searchParams: Promise<{ filter?: string }>;
}

export default async function TaskPage({ searchParams }: Props) {
  const { filter: rawFilter } = await searchParams;
  const filter = rawFilter || "all";

  return (
    <div className='max-w-6xl mx-auto p-6 space-y-8'>
      <h1 className='text-2xl font-bold'>My Tasks</h1>
      <main>
        <Suspense key={filter} fallback={<TaskSkeleton />}>
          <TaskList filter={filter} />
        </Suspense>
      </main>
    </div>
  );
}
