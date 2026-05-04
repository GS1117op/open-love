"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/app/admin/actions";

const initialState = { message: "" };

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(loginAdmin, initialState);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium" style={{ color: "#e0d0f0" }}>
          管理パスコード
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="flex h-11 w-full rounded-xl px-3 py-2 text-sm"
          placeholder="パスコードを入力"
        />
      </div>

      {state.message ? (
        <div
          className="rounded-xl border px-4 py-3 text-sm"
          style={{ borderColor: "rgba(255, 77, 141, 0.25)", background: "rgba(255, 77, 141, 0.08)", color: "#ff8cc8" }}
        >
          {state.message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="btn-gradient flex h-11 w-full items-center justify-center rounded-xl px-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "確認中..." : "管理画面に入る"}
      </button>
    </form>
  );
}
