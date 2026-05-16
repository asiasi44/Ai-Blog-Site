"use server";

import dbConnect from "../mongoose";

export async function subscribeToNewsletter(
  email: string,
): Promise<{ success: boolean; message: string }> {
  try {
    await dbConnect();

    return { success: true, message: "Subscribed Successfully" };
  } catch (error: any) {
    console.log(error.message);
    return { success: false, message: error?.message || "Some Error Occured" };
  }
}
