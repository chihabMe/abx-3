"use client";

import { markContactAsRead } from "@/app/actoins/admin-actions";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export function ContactReadToggle({ contactId, isRead }: { contactId: string; isRead: boolean }) {
  return (
    <form action={() => {
      markContactAsRead(contactId, !isRead)
    }}>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
        {isRead ? (
          <X className="h-4 w-4 text-gray-500" />
        ) : (
          <Check className="h-4 w-4 text-green-500" />
        )}
      </Button>
    </form>
  );
}
