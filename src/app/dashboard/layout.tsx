import Sidebar from "@/components/client/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full flex flex-row">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </section>
  );
}
