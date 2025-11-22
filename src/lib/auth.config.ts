import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  // We leave providers empty here. It will be defined in the main auth.ts file.
  providers: [],
  pages: {
    signIn: "/admin/auth/login",
    error: "/admin/auth/error",
  },
  secret:
    process.env.NEXTAUTH_SECRET || process.env.SECRET || "fallback-secret-key",
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdminDashboard =
        nextUrl.pathname.startsWith("/admin/dashboard");

      // Only protect dashboard routes
      if (isOnAdminDashboard) {
        return isLoggedIn; // Return true if logged in, false to redirect to signIn page
      }

      // Allow all other routes
      return true;
    },
  },
};
