import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-slate-600">OpenLove Admin</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
          管理画面ログイン
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          自分専用の管理画面です。環境変数で設定した管理パスコードを入力してください。
        </p>

        <div className="mt-6">
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
