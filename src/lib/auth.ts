import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma as db } from "./db";
import { verifyPassword } from "@/lib/passwords";
import { redirect } from "next/navigation";

// Import the edge-safe config
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Spread the edge-safe config
  ...authConfig,

  // Add the session strategy and callbacks here
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET ?? "owijfkdsgf",
  callbacks: {
    // We keep authorized from auth.config.ts
    ...authConfig.callbacks,

    // And add the callbacks that need the user object from the database
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  // Add your Node.js-dependent providers here
  providers: [
    Credentials({
      // `authorize` is only ever called in a Node.js environment
      async authorize(credentials) {
        const email = credentials.email as string;
        const password = credentials.password as string;
        if (!email || !password) return null;

        try {
          const user = await db.user.findFirst({
            where: { email },
          });
          if (!user) return null;

          // `verifyPassword` uses `crypto`, which is fine here
          const isValid = await verifyPassword(password, user.password);
          if (!isValid) return null;

          return {
            id: user.id,
            email: user.email,
            role: "admin",
          };
        } catch (err) {
          console.log("Error in auth.ts ", err);
          return null;
        }
      },
    }),
  ],
});

export const getUserOrRedirectToLogin = async () => {
  const session = await auth();
  if (!session || !session.user) redirect("/admin/auth/login");
  return session.user;
};
