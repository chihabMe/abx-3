import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";
// Import the edge-safe config, NOT the main auth.ts file

// Initialize NextAuth with only the edge-safe config
const { auth } = NextAuth(authConfig);

// Export the auth function as the default middleware
export default auth;

// Temporarily disable middleware to test basic flow
// Update matcher to only protect dashboard routes
export const config = {
  matcher: [],
};
