import EditTaskPage from "@/app/dashboard/components/EditTaskPage";
import { getTaskById } from "@/app/form/(tasks)/actions";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: task } = await getTaskById(id);
  if (!task) notFound();

  return <EditTaskPage task={task} />;
}
