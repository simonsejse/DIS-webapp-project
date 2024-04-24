"use client";
import Image from "next/image";
import React from "react";
import CalendarForm from "@/components/ui/CalendarForm"
import Test from "@/components/client/Test"

export default function Home() {
  const fetchusers = async () => {
    const response = await fetch("/api/user", { method: "GET" });
    const data = await response.json()
    return data.data;
  }
  console.log(fetchusers().then(users => console.log(users)));
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CalendarForm />
      <Test />
    </main>
  );
}
