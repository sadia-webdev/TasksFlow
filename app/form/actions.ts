"use server";

import User from "../api/models/User";
import bcryptjs from "bcryptjs";
import { connectDB } from "../lib/db";

type FormState = {
  message: string;
  success?: boolean;
};

export async function register(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await connectDB();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return { message: "All fields are required", success: false };
    }

    if (password.length < 6) {
      return {
        message: "Password must be at least 6 characters long.",
        success: false,
      };
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        message: "An account with this email already exists.",
        success: false,
      };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    
    return { message: "Successfully registered", success: true };
  } catch (error: unknown) {
    console.error("Registration Error:", error);
    return {
      message: "Something went wrong. Please try again.",
      success: false,
    };
  }
}
