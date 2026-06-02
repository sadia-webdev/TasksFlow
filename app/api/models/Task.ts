import mongoose, { Schema, models } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    dueDate: {
      type: Date,
    },

    priority: {
      type: String,
      default: "medium",
      enum: ["low", "medium", "high", "urgent"],
    },
    status: {
      type: String,
      default: "todo",
      enum: ["todo", "in-progress", "done", "cancelled"],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Task = models.Task || mongoose.model("Task", taskSchema);

export default Task;
