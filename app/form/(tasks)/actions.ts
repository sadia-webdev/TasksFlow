"use server";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Task from "@/app/api/models/Task";
import { connectDB } from "@/app/lib/db";
import { getServerSession } from "next-auth";

type formState = {
  message: string;
  success?: boolean;
};

export async function createTask(
  prevState: formState,
  formData: FormData,
): Promise<formState> {
  try {
    await connectDB();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dueDate = formData.get("dueDate") as string;
    const priority = formData.get("priority") as string;
    const status = formData.get("status") as string;

    if (!title?.trim() || !dueDate?.trim()) {
      return { message: "Title and due date are required", success: false };
    }

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return { message: "Unauthorized", success: false };
    }

    await Task.create({
      title,
      description: description?.trim() || undefined,
      dueDate: new Date(dueDate),
      priority: priority || "medium",
      status: status || "todo",
      createdBy: userId,
    });

    revalidatePath("/dashboard/tasks");
    return { message: "Task created successfully", success: true };
  } catch (error: unknown) {
    console.log("Error creating task:", error);
    return { message: "Failed to create task", success: false };
  }
}

export async function updateTask(
  prevState: formState,
  formData: FormData,
): Promise<formState> {
  try {
    await connectDB();

    const taskId = formData.get("taskId") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dueDate = formData.get("dueDate") as string;
    const priority = formData.get("priority") as string;
    const status = formData.get("status") as string;

    if (!taskId?.trim()) {
      return { message: "Task ID is required", success: false };
    }

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return { message: "Unauthorized", success: false };
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return { message: "Task not found", success: false };
    } else if (task.createdBy.toString() !== userId) {
      return { message: "Unauthorized", success: false };
    }

    task.title = title || task.title;
    task.description = description?.trim() || task.description;
    task.dueDate = dueDate ? new Date(dueDate) : task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    await task.save();

    revalidatePath("/dashboard/tasks");
    return { message: "Task updated successfully", success: true };
  } catch (error: unknown) {
    console.log("Error updating task:", error);
    return { message: "Failed to update task", success: false };
  }
}

export async function deleteTask(
  prevState: formState,
  formData: FormData,
): Promise<formState> {
  try {
    await connectDB();

    const taskId = formData.get("taskId") as string;

    if (!taskId?.trim()) {
      return { message: "Task ID is required", success: false };
    }

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return { message: "Unauthorized", success: false };
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return { message: "Task not found", success: false };
    } else if (task.createdBy.toString() !== userId) {
      return { message: "Unauthorized", success: false };
    }
    await Task.findByIdAndDelete(taskId);

    revalidatePath("/dashboard/tasks");

    return { message: "Task deleted successfully", success: true };
  } catch (error: unknown) {
    console.log("Error deleting task:", error);
    return { message: "Failed to delete task", success: false };
  }
}

export async function getUserTasks() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { success: false, data: [] };

    const tasks = await Task.find({ createdBy: session.user.id }).sort({
      createdAt: -1,
    });

    return { success: true, data: JSON.parse(JSON.stringify(tasks)) };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return { success: false, data: [] };
  }
}

export async function getTaskById(taskId: string) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { success: false, data: null };

    const task = await Task.findOne({
      _id: taskId,
      createdBy: session.user.id
    });

    if (!task) return { success: false, data: null };
    return { success: true, data: JSON.parse(JSON.stringify(task)) };
  } catch (error) {
    console.error("Error fetching task:", error);
    return { success: false, data: null };
  }
}