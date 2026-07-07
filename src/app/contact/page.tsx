"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useApp } from "@/components/providers/AppProviders";

export default function ContactPage() {
  const { messages, dir } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? messages.contact.error);
        setStatus("error");
        return;
      }
      setName("");
      setEmail("");
      setMessage("");
      setStatus("success");
    } catch {
      setError(messages.contact.error);
      setStatus("error");
    }
  };

  return (
    <AppShell>
      <div className="luxury-page mx-auto max-w-2xl px-4 py-12" dir={dir}>
        <h1 className="text-center font-serif text-3xl tracking-wide text-[#2c3e35]">
          {messages.contact.title}
        </h1>
        <p className="mt-3 text-center text-sm text-[#7a8b82]">{messages.contact.subtitle}</p>

        <form onSubmit={submit} className="luxury-card mt-8 space-y-4 p-8">
          <div>
            <label className="mb-1 block text-sm text-[#7a8b82]">{messages.contact.name}</label>
            <input
              className="luxury-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-[#7a8b82]">{messages.contact.email}</label>
            <input
              type="email"
              className="luxury-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-[#7a8b82]">{messages.contact.message}</label>
            <textarea
              className="luxury-input min-h-[140px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          {status === "success" && (
            <p className="text-sm text-[#2c6e55]">{messages.contact.success}</p>
          )}
          {(status === "error" || error) && (
            <p className="text-sm text-red-600">{error || messages.contact.error}</p>
          )}

          <button type="submit" className="luxury-btn w-full" disabled={status === "loading"}>
            {status === "loading" ? messages.contact.sending : messages.contact.send}
          </button>
        </form>
      </div>
    </AppShell>
  );
}
