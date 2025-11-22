import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  MessageSquare,
} from "lucide-react";
import { getOrders, getContacts } from "@/app/actoins/admin-actions";

export async function DashboardStats() {
  const [ordersData, contactsData] = await Promise.all([
    getOrders(1, 1), // We only need counts
    getContacts(1, 1) // We only need counts
  ]);

  // Calculate stats
  const totalOrders = ordersData.pagination.total;
  const totalContacts = contactsData.pagination.total;
  const unreadContacts = contactsData.contacts.filter(c => !c.isRead).length;


  // Calculate conversion rate (orders/contacts)
  // Get latest order time
  const latestOrder = ordersData.orders[0]?.createdAt;
  const latestOrderTime = latestOrder
    ? new Date(latestOrder).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    : 'Aucune';

  const stats = [
    {
      title: "Commandes totales",
      value: totalOrders,
      icon: Package,
      description: `Dernière à ${latestOrderTime}`,
    },
    {
      title: "Messages",
      value: totalContacts,
      icon: MessageSquare,
      description: `${unreadContacts} non lus`,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
