import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, User, Mail, Phone, Calendar } from "lucide-react";
import { getContacts, getReadCount, getUnReadCount } from "@/app/actoins/admin-actions";
import { ContactsTableActions } from "./_components/ContactsTableActions";
import { PaginationComponent } from "@/components/Pagination";

interface ContactsPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

async function ContactsTable({ page }: { page: number }) {
  const { contacts, pagination } = await getContacts(page, 10);

  if (contacts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Aucun message trouvé</h3>
          <p className="text-muted-foreground text-center">
            Il n&apos;y a aucun message de contact à afficher pour le moment.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Statut</TableHead>
                <TableHead>Pays</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id} className={!contact.isRead ? "bg-blue-50/50" : ""}>
                  <TableCell>
                    <Badge
                      variant={contact.isRead ? "secondary" : "default"}
                      className={contact.isRead ? "" : "bg-blue-600 hover:bg-blue-700"}
                    >
                      {contact.isRead ? "Lu" : "Nouveau"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium max-w-[200px] truncate">
                      {contact.country || "Aucun "}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium">{contact.fullName}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span>{contact.email}</span>
                      </div>
                      {contact.phoneNumber && (
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          <span>{contact.phoneNumber}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[300px]">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {contact.message}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3" />
                      <span className="text-sm">
                        {new Date(contact.createdAt).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <ContactsTableActions contact={contact} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <PaginationComponent
        currentPage={pagination.page}
        totalPages={pagination.pages}
        baseUrl="/admin/contacts"
      />
    </div>
  );
}

function ContactsTableSkeleton() {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Statut</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                <TableCell><Skeleton className="h-12 w-32" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-8 w-48" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default async function ContactsPage({ searchParams }: ContactsPageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1;
  const { pagination } = await getContacts(page, 10);

  const redContactsCount = await getReadCount()
  const unRedContactsCount = await getUnReadCount()

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Messages de Contact</h1>
        <p className="text-muted-foreground">
          Gérez tous les messages reçus via le formulaire de contact
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pagination.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Non Lus</CardTitle>
            <Badge className="bg-blue-100 text-blue-800 text-xs">NOUVEAU</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unRedContactsCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lus</CardTitle>
            <Badge className="bg-gray-100 text-gray-800 text-xs">LU</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{redContactsCount}</div>
          </CardContent>
        </Card>
      </div>

      <Suspense fallback={<ContactsTableSkeleton />}>
        <ContactsTable page={page} />
      </Suspense>
    </div>
  );
}
