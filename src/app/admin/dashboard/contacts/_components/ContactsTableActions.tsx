"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MoreHorizontal, Trash2, Eye, Mail, Phone, MessageCircle, CheckCircle, Circle } from "lucide-react";
import { deleteContact, markContactAsRead } from "@/app/actoins/admin-actions";
import { toast } from "sonner";

interface Contact {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  message: string | null;
  subject: string | null;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ContactsTableActionsProps {
  contact: Contact;
}

export function ContactsTableActions({ contact }: ContactsTableActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const result = await deleteContact(contact.id);
      if (result.success) {
        toast.success(result.message);
        setShowDeleteDialog(false);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error)
      toast.error("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (isRead: boolean) => {
    setIsLoading(true);
    try {
      const result = await markContactAsRead(contact.id, isRead);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error)
      toast.error("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewMessage = async () => {
    if (!contact.isRead) {
      await handleMarkAsRead(true);
    }
    setShowViewDialog(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Ouvrir le menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleViewMessage}>
            <Eye className="mr-2 h-4 w-4" />
            Voir le message
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => window.open(`mailto:${contact.email}`)}
          >
            <Mail className="mr-2 h-4 w-4" />
            Envoyer un email
          </DropdownMenuItem>
          {contact.phoneNumber && (
            <DropdownMenuItem
              onClick={() => contact.phoneNumber && window.open(`https://wa.me/${contact.phoneNumber.replace(/\s+/g, '')}`)}
            >
              <Phone className="mr-2 h-4 w-4" />
              WhatsApp
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleMarkAsRead(!contact.isRead)}
            disabled={isLoading}
          >
            {contact.isRead ? (
              <Circle className="mr-2 h-4 w-4" />
            ) : (
              <CheckCircle className="mr-2 h-4 w-4" />
            )}
            {contact.isRead ? "Marquer comme non lu" : "Marquer comme lu"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Cela supprimera définitivement
              le message de {contact.fullName}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? "Suppression..." : "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Message de {contact.fullName}</span>
            </DialogTitle>
            <DialogDescription>
              Reçu le {new Date(contact.createdAt).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Email</span>
                </div>
                <p className="text-sm text-muted-foreground">{contact.email}</p>
              </div>
              {contact.phoneNumber && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Téléphone</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{contact.phoneNumber}</p>
                </div>
              )}
            </div>

            {contact.subject && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Sujet</h4>
                <p className="text-sm text-muted-foreground">{contact.subject}</p>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Message</h4>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm whitespace-pre-wrap">{contact.message}</p>
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button
                onClick={() => window.open(`mailto:${contact.email}`)}
                className="flex-1"
              >
                <Mail className="mr-2 h-4 w-4" />
                Répondre par email
              </Button>
              {contact.phoneNumber && (
                <Button
                  variant="outline"
                  onClick={() => window.open(`https://wa.me/${contact.phoneNumber?.replace(/\s+/g, '')}`)}
                  className="flex-1"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
