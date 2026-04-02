"use server";

import { db } from "@/lib/db";

export type ContactFormState = {
  success: boolean;
  message: string;
} | null;

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Validate required fields
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return { success: false, message: "Vul uw naam in." };
  }
  if (!email || typeof email !== "string" || email.trim().length === 0) {
    return { success: false, message: "Vul uw e-mailadres in." };
  }
  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return { success: false, message: "Vul een geldig e-mailadres in." };
  }
  if (!subject || typeof subject !== "string" || subject.trim().length === 0) {
    return { success: false, message: "Vul een onderwerp in." };
  }
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return { success: false, message: "Vul een bericht in." };
  }

  try {
    await db.contactSubmission.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      },
    });

    return {
      success: true,
      message: "Bedankt voor uw bericht! Wij nemen zo snel mogelijk contact met u op.",
    };
  } catch (error) {
    console.error("Failed to save contact submission:", error);
    return {
      success: false,
      message: "Er is iets misgegaan. Probeer het later opnieuw.",
    };
  }
}
