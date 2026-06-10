import AppLayout from "@/components/AppLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <AppLayout>{children}</AppLayout>
    </ProtectedRoute>
  );
}
