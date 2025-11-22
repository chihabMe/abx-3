# Admin Route Protection Test

This document outlines how to test the admin route protection.

## Protected Routes

The following routes are now protected and require authentication:

- `/admin` - Main admin page (redirects to dashboard)
- `/admin/dashboard` - Admin dashboard
- `/admin/dashboard/*` - All dashboard sub-routes
- `/api/admin/*` - Admin API endpoints

## Unprotected Routes

The following routes remain accessible without authentication:

- `/admin/auth/login` - Login page
- `/admin/auth/error` - Auth error page

## Protection Layers

1. **Middleware Protection**: NextAuth middleware intercepts requests to admin routes
2. **Server-side Protection**: Admin layout performs server-side authentication check
3. **Client-side Protection**: AuthGuard component available for client components

## Testing

To test the protection:

1. **Without authentication**:
   - Visit `/admin` → Should redirect to `/admin/auth/login`
   - Visit `/admin/dashboard` → Should redirect to `/admin/auth/login`
   - Call `/api/admin/test` → Should return 401 Unauthorized

2. **With authentication**:
   - Login via `/admin/auth/login`
   - Visit `/admin` → Should redirect to `/admin/dashboard`
   - Visit `/admin/dashboard` → Should display dashboard
   - Call `/api/admin/test` → Should return success response

## Configuration Files

- `src/app/middleware.ts` - NextAuth middleware configuration
- `src/app/admin/layout.tsx` - Server-side auth check for all admin routes
- `src/lib/auth.ts` - Authentication configuration
- `src/components/AuthGuard.tsx` - Client-side auth guard component
