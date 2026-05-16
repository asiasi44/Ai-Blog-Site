"use server";

import dbConnect from "@/lib/mongoose";
import { UTMSource } from "./types";
import Subscriber from "@/models/Subscriber";

export async function subscribeToNewsletter(body: {
  email: string;
  source: UTMSource;
  campaign: string;
}): Promise<{ success: boolean; message: string }> {
  const { email, source, campaign } = body;
  try {
    await dbConnect();
    const addedSubscriber = new Subscriber({
      email,
      source,
      campaign,
    });
    await addedSubscriber.save();
    return { success: true, message: "Subscribed Successfully" };
  } catch (error: any) {
    console.log(error.message);
    return { success: false, message: error?.message || "Some Error Occured" };
  }
}
