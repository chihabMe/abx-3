"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Admin actions for orders
export async function deleteOrder(orderId: string) {
  try {
    await prisma.order.delete({
      where: { id: orderId },
    });
    revalidatePath("/admin/orders");
    return { success: true, message: "Commande supprimée avec succès" };
  } catch (error) {
    console.error("Error deleting order:", error);
    return { success: false, message: "Erreur lors de la suppression" };
  }
}


// Admin actions for contacts
export async function deleteContact(contactId: string) {
  try {
    await prisma.contact.delete({
      where: { id: contactId },
    });
    revalidatePath("/admin/contacts");
    return { success: true, message: "Contact supprimé avec succès" };
  } catch (error) {
    console.error("Error deleting contact:", error);
    return { success: false, message: "Erreur lors de la suppression" };
  }
}

export async function markContactAsRead(contactId: string, isRead: boolean) {
  try {
    await prisma.contact.update({
      where: { id: contactId },
      data: { isRead },
    });
    revalidatePath("/admin/contacts");
    return { success: true, message: isRead ? "Marqué comme lu" : "Marqué comme non lu" };
  } catch (error) {
    console.error("Error updating contact:", error);
    return { success: false, message: "Erreur lors de la mise à jour" };
  }
}

// Get orders with pagination
export async function getOrders(page: number = 1, limit: number = 10) {
  try {
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count(),
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      orders: [],
      pagination: { page: 1, limit, total: 0, pages: 0 },
    };
  }
}

// Get contacts with pagination
export async function getContacts(page: number = 1, limit: number = 10) {
  try {
    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.contact.count(),
    ]);

    return {
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return {
      contacts: [],
      pagination: { page: 1, limit, total: 0, pages: 0 },
    };
  }
}
export const getReadCount = async () => {
  try {
    return await prisma.contact.count({
      where: {
        isRead: true
      }
    });
  } catch (error) {
    console.error("Error fetching read contacts count:", error);
    return 0;
  }
}

export const getUnReadCount = async () => {
  try {
    return await prisma.contact.count({
      where: {
        isRead: false
      }
    });
  } catch (error) {
    console.error("Error fetching unread contacts count:", error);
    return 0;
  }
}
