import { useSession } from 'next-auth/react';
import type { Role, RolePermissions } from '@/types/roles';

interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  role: Role;
  permissions: RolePermissions;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
}

type SessionStatus = 'authenticated' | 'loading' | 'unauthenticated';

export function useAuth(): AuthState {
  const { data: session, status } = useSession();

  // Handle loading state
  if (status === 'loading') {
    return {
      isAuthenticated: false,
      isLoading: true,
      user: null,
    };
  }

  // Handle unauthenticated state
  if (status !== 'authenticated' || !session?.user?.email) {
    return {
      isAuthenticated: false,
      isLoading: false,
      user: null,
    };
  }

  // Handle authenticated state
  return {
    isAuthenticated: true,
    isLoading: false,
    user: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name ?? null,
      image: session.user.image ?? null,
      role: session.user.role,
      permissions: session.user.permissions,
    },
  };
}

// Helper functions for role-based checks
export function useIsAdmin(): boolean {
  const { user } = useAuth();
  return user?.role === 'admin' || user?.role === 'super_admin';
}

export function useIsSuperAdmin(): boolean {
  const { user } = useAuth();
  return user?.role === 'super_admin';
}

export function useHasPermission(permission: keyof RolePermissions): boolean {
  const { user } = useAuth();
  return !!user?.permissions[permission];
}

// Custom hook for ticket-related permissions
export function useTicketPermissions() {
  const { user } = useAuth();
  
  return {
    canCreateTickets: !!user?.permissions.canCreateTickets,
    canViewAllTickets: !!user?.permissions.canViewAllTickets,
    canAssignTickets: !!user?.permissions.canAssignTickets,
    canUpdateTicketStatus: !!user?.permissions.canUpdateTicketStatus,
    canDeleteTickets: !!user?.permissions.canDeleteTickets,
    canManageTicketCategories: !!user?.permissions.canManageTicketCategories,
    canViewInternalNotes: !!user?.permissions.canViewInternalNotes,
    canAddInternalNotes: !!user?.permissions.canAddInternalNotes,
    canSetTicketPriority: !!user?.permissions.canSetTicketPriority,
    canManageTicketTags: !!user?.permissions.canManageTicketTags,
  };
} 