"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { useApp } from "@/components/providers/AppProviders";
import { useAuth } from "@/components/providers/AuthProvider";

async function parseJsonResponse(res: Response) {
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return { error: "Request failed" };
  }
  return res.json();
}

function LoginForm() {
  const { messages, dir } = useApp();
  const { refresh, user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/dashboard");
    }
  }, [authLoading, user, router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const body = mode === "login" ? { email, password } : { email, password, name };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await parseJsonResponse(res);
      if (!res.ok) {
        setError(data.error ?? messages.auth.requestFailed);
        return;
      }
      await refresh();
      const next = searchParams.get("next");
      router.push(next && next.startsWith("/") ? next : "/dashboard");
    } catch {
      setError(messages.auth.requestFailed);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <AppShell>
        <div className="luxury-page flex min-h-[40vh] items-center justify-center luxury-muted">
          {messages.dashboard.loading}
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="luxury-page mx-auto max-w-md px-4 py-12 sm:py-14" dir={dir}>
        <h1 className="luxury-heading-page">
          {mode === "login" ? messages.auth.loginTitle : messages.auth.registerTitle}
        </h1>

        <form onSubmit={submit} className="luxury-card mt-8 space-y-5 p-6 sm:p-8">
          {mode === "register" && (
            <div>
              <label className="luxury-label">{messages.auth.name}</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="luxury-input"
                dir={dir}
              />
            </div>
          )}
          <div>
            <label className="luxury-label">{messages.auth.email}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="luxury-input"
              dir="ltr"
            />
          </div>
          <div>
            <label className="luxury-label">{messages.auth.password}</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="luxury-input"
              dir="ltr"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={loading} className="luxury-btn w-full">
            {loading
              ? messages.auth.submitting
              : mode === "login"
                ? messages.auth.submitLogin
                : messages.auth.submitRegister}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError("");
          }}
          className="mt-4 text-sm text-[#2c6e55] hover:underline"
        >
          {mode === "login" ? messages.auth.noAccount : messages.auth.hasAccount}
        </button>
      </div>
    </AppShell>
  );
}

export default function LoginPage() {
  const { messages } = useApp();

  return (
    <Suspense
      fallback={
        <AppShell>
          <div className="luxury-page flex min-h-[40vh] items-center justify-center luxury-muted">
            {messages.dashboard.loading}
          </div>
        </AppShell>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
