import { SiteHeader } from "@/components/layout/site-header";
import { FeedbackForm } from "@/components/feedback/feedback-form";

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
        <FeedbackForm />
      </main>
    </div>
  );
}