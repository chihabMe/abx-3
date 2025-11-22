import { redirect } from "next/navigation";

export default async function AdminPage() {
  // Simply redirect to dashboard - let middleware handle auth
  redirect("/admin/dashboard");
}
