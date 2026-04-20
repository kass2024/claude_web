"use client";

import { useState } from "react";
import { apiPost } from "@/lib/api";

const consultationTypes = ["Virtual Meeting", "Phone Call", "In-Person Meeting"] as const;

export function ConsultationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setStatus("submitting");
    setError(null);

    const payload = {
      full_name: String(formData.get("full_name") ?? ""),
      company: String(formData.get("company") ?? "") || null,
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? "") || null,
      country: String(formData.get("country") ?? "") || null,
      preferred_date: String(formData.get("preferred_date") ?? "") || null,
      consultation_type: String(formData.get("consultation_type") ?? "") || null,
      service_category: String(formData.get("service_category") ?? "") || null,
      project_summary: String(formData.get("project_summary") ?? ""),
    };

    try {
      const res = await apiPost("/consultation", payload);
      if (!res.ok) throw new Error("Submission failed.");
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Submission failed.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl bg-[var(--brand-bg)] p-8 ring-1 ring-inset ring-black/5">
        <div className="text-lg font-semibold text-[var(--brand-text)]">
          Consultation requested
        </div>
        <p className="mt-2 text-sm leading-7 text-[var(--brand-muted)]">
          Thank you. We’ll follow up to confirm the details.
        </p>
      </div>
    );
  }

  return (
    <form
      className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm"
      action={onSubmit}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-[var(--brand-text)]">Full Name</span>
          <input
            name="full_name"
            required
            className="h-11 rounded-2xl border border-black/10 bg-white px-4 outline-none focus:ring-2 focus:ring-[var(--brand-accent)]"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-[var(--brand-text)]">Company</span>
          <input
            name="company"
            className="h-11 rounded-2xl border border-black/10 bg-white px-4 outline-none focus:ring-2 focus:ring-[var(--brand-accent)]"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-[var(--brand-text)]">Email</span>
          <input
            name="email"
            type="email"
            required
            className="h-11 rounded-2xl border border-black/10 bg-white px-4 outline-none focus:ring-2 focus:ring-[var(--brand-accent)]"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-[var(--brand-text)]">Phone</span>
          <input
            name="phone"
            className="h-11 rounded-2xl border border-black/10 bg-white px-4 outline-none focus:ring-2 focus:ring-[var(--brand-accent)]"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-[var(--brand-text)]">Country</span>
          <input
            name="country"
            className="h-11 rounded-2xl border border-black/10 bg-white px-4 outline-none focus:ring-2 focus:ring-[var(--brand-accent)]"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-[var(--brand-text)]">
            Preferred Consultation Date
          </span>
          <input
            name="preferred_date"
            type="date"
            className="h-11 rounded-2xl border border-black/10 bg-white px-4 outline-none focus:ring-2 focus:ring-[var(--brand-accent)]"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-[var(--brand-text)]">
            Preferred Consultation Type
          </span>
          <select
            name="consultation_type"
            defaultValue=""
            className="h-11 rounded-2xl border border-black/10 bg-white px-4 outline-none focus:ring-2 focus:ring-[var(--brand-accent)]"
          >
            <option value="" disabled>
              Select type
            </option>
            {consultationTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-semibold text-[var(--brand-text)]">Service Category</span>
          <input
            name="service_category"
            className="h-11 rounded-2xl border border-black/10 bg-white px-4 outline-none focus:ring-2 focus:ring-[var(--brand-accent)]"
            placeholder="e.g. Artificial Intelligence & Innovation"
          />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm">
        <span className="font-semibold text-[var(--brand-text)]">Project Summary</span>
        <textarea
          name="project_summary"
          required
          rows={6}
          className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--brand-accent)]"
        />
      </label>

      {status === "error" && (
        <div className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-inset ring-red-200">
          {error ?? "Something went wrong. Please try again."}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[var(--brand-primary)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[color-mix(in_oklab,var(--brand-primary)_90%,black)] disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting..." : "Book a Consultation"}
      </button>
    </form>
  );
}

