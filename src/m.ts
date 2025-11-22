import { withAuth } from "next-auth/middleware";

// Define the middleware function
export default withAuth(
  function middleware(req) {
    // Middleware logic for authenticated admin routes
    const { pathname } = req.nextUrl;
    console.log("Admin middleware: protecting", pathname);
    return;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow access to auth pages without authentication
        if (pathname.startsWith("/admin/auth/")) {
          return true;
        }

        // All other matched routes require authentication
        const isAuthenticated = !!token;

        if (!isAuthenticated) {
          console.log("Unauthorized access attempt to:", pathname);
        }

        return isAuthenticated;
      },
    },
  }
);

// Export the configuration
export const config = {
  matcher: [
    // Match admin routes - the callback will handle auth page exceptions
    "/admin/:path*",
    // Also protect admin API routes (but not auth API routes)
    "/api/admin/:path*",
  ],
};
