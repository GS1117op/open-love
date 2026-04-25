"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, getAdminPasswordHash, verifyAdminPassword } from "@/lib/admin-auth";

export async function loginAdmin(
  _previousState: { message: string } | undefined,
  formData: FormData
) {
  const password = String(formData.get("password") ?? "");
  const passwordHash = getAdminPasswordHash();

  if (!passwordHash) {
    return {
      message:
        "ADMIN_DASHBOARD_PASSWORD が未設定です。環境変数を追加してから管理画面を有効にしてください。",
    };
  }

  if (!verifyAdminPassword(password)) {
    return {
      message: "パスコードが違います。",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, passwordHash, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}
