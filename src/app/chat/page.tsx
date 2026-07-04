"use client";

import { AppShell } from "@/components/layout/AppShell";
import { ChatPanel } from "@/components/chat/ChatPanel";

export default function ChatPage() {
  return (
    <AppShell>
      <ChatPanel />
    </AppShell>
  );
}
