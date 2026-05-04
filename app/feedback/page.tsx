import { SiteHeader } from "@/components/layout/site-header";
import { FeedbackForm } from "@/components/feedback/feedback-form";

export default function FeedbackPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
        <FeedbackForm />
      </main>
    </div>
  );
}
