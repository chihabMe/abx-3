import { Suspense } from "react";
import { DashboardStats } from "./_components/DashboardStats";
import { RecentOrders } from "./_components/RecentOrders";
import RecentContacts from "./_components/RecentContacts";
import { Skeleton } from "@/components/ui/skeleton";

// ... (keep the existing DashboardStats and RecentOrders components as they are)

export default async function AdminDashboard() {
  // Authentication is handled in the layout

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
        </div>

        <Suspense
          fallback={
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-[120px] w-full rounded-xl" />
              ))}
            </div>
          }
        >
          <DashboardStats />
        </Suspense>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <Suspense
              fallback={<Skeleton className="h-[400px] w-full rounded-xl" />}
            >
              <RecentOrders />
            </Suspense>
          </div>
          <div className="col-span-3">
            <RecentContacts />
          </div>
        </div>
      </div>
    </div>
  );
}
