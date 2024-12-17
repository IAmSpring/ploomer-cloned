import 'next-auth';
import type { Role, RolePermissions } from './roles';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: Role;
      permissions: RolePermissions;
    }
  }

  interface User {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
    role: Role;
  }

  interface JWT {
    id: string;
    role: Role;
    permissions: RolePermissions;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: Role;
    permissions: RolePermissions;
  }
} 