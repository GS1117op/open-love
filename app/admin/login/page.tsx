import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen px-4 py-10">
      <div
        className="mx-auto max-w-md p-8"
        style={{
          borderRadius: "24px",
          background: "rgba(42, 17, 69, 0.8)",
          border: "1px solid rgba(255, 77, 141, 0.2)",
          backdropFilter: "blur(12px)",
        }}
      >
        <p className="text-sm font-medium" style={{ color: "#ff4d8d" }}>OpenLove Admin</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight" style={{ color: "#f0e6ff" }}>
          管理画面ログイン
        </h1>
        <p className="mt-3 text-sm leading-6" style={{ color: "#b09fc8" }}>
          自分専用の管理画面です。環境変数で設定した管理パスコードを入力してください。
        </p>

        <div className="mt-6">
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
