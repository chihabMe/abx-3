import { createSafeActionClient } from "next-safe-action";
import { auth } from "./auth";

export const publicActionsClient = createSafeActionClient();

export const protectedActionClient = publicActionsClient.use(
  async ({ next, ctx }) => {
    const session = await auth();
    if (!session || !session.user) throw new Error("Unauthorized");
    return next({ ctx: { ...ctx, user: session.user } });
  }
);
