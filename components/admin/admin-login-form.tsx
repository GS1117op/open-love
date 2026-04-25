"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/app/admin/actions";

const initialState = { message: "" };

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(loginAdmin, initialState);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-slate-800">
          管理パスコード
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400"
          placeholder="パスコードを入力"
        />
      </div>

      {state.message ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          {state.message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="flex h-11 w-full items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "確認中..." : "管理画面に入る"}
      </button>
    </form>
  );
}
