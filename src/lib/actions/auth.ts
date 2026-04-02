"use server";

import { login, logout } from "@/lib/auth";
import { redirect } from "next/navigation";

export type LoginState = {
  success: boolean;
  error: string;
};

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Vul e-mail en wachtwoord in." };
  }

  const ok = await login(email, password);
  if (!ok) {
    return { success: false, error: "Ongeldige inloggegevens." };
  }

  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await logout();
  redirect("/admin/login");
}
