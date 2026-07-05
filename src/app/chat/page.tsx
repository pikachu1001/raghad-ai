"use client";

import { Suspense } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ChatPanel } from "@/components/chat/ChatPanel";

export default function ChatPage() {
  return (
    <AppShell>
      <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Loading...</div>}>
        <ChatPanel />
      </Suspense>
    </AppShell>
  );
}
