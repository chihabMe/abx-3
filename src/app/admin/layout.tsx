import type React from "react";

interface AdminRootLayoutProps {
  children: React.ReactNode;
}

export default async function AdminRootLayout({
  children,
}: AdminRootLayoutProps) {
  // Remove authentication from root admin layout to prevent redirect loops
  // Authentication will be handled at the individual page level
  return <>{children}</>;
}
