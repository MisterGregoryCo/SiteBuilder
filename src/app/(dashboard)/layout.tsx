import { NavBar } from '@/components/nav-bar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      <NavBar />
      {children}
    </div>
  );
}
