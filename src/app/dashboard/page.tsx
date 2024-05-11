"use client";
import React from "react";
import CalendarForm from "@/components/ui/CalendarForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CalendarForm />
    </main>
  );
}
