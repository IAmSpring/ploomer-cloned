import type { Prisma } from '@prisma/client';

// Define the Role type based on Prisma's schema
export type Role = 'user' | 'admin' | 'super_admin';

// Constants for role values that match the Prisma schema
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  USER: 'user',
} as const satisfies Record<string, Role>;

// Base user data type
export type UserData = {
  email: string;
  name?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  role: Role;
};

// Prisma-specific types for operations
export type PrismaUserCreate = Omit<Prisma.UserCreateInput, 'role'> & {
  role: Role;
};

export type PrismaUserUpdate = Omit<Prisma.UserUncheckedUpdateInput, 'role'> & {
  role?: Role;
};

// Type for user operations
export type UserOperations = {
  create: PrismaUserCreate;
  update: PrismaUserUpdate;
  where: Prisma.UserWhereUniqueInput;
};

export type RolePermissions = {
  canManageUsers: boolean;
  canManageRoles: boolean;
  canViewAnalytics: boolean;
  canEditSettings: boolean;
  canCreateReports: boolean;
  canDeleteReports: boolean;
  canShareReports: boolean;
  canOverrideAdmin: boolean;
  canAccessAllData: boolean;
  canManageSubscriptions: boolean;
  canConfigureSystem: boolean;
  canCreateTickets: boolean;
  canViewAllTickets: boolean;
  canAssignTickets: boolean;
  canUpdateTicketStatus: boolean;
  canDeleteTickets: boolean;
  canManageTicketCategories: boolean;
  canViewInternalNotes: boolean;
  canAddInternalNotes: boolean;
  canSetTicketPriority: boolean;
  canManageTicketTags: boolean;
};

export const ROLE_PERMISSIONS: Record<Role, RolePermissions> = {
  super_admin: {
    canManageUsers: true,
    canManageRoles: true,
    canViewAnalytics: true,
    canEditSettings: true,
    canCreateReports: true,
    canDeleteReports: true,
    canShareReports: true,
    canOverrideAdmin: true,
    canAccessAllData: true,
    canManageSubscriptions: true,
    canConfigureSystem: true,
    canCreateTickets: true,
    canViewAllTickets: true,
    canAssignTickets: true,
    canUpdateTicketStatus: true,
    canDeleteTickets: true,
    canManageTicketCategories: true,
    canViewInternalNotes: true,
    canAddInternalNotes: true,
    canSetTicketPriority: true,
    canManageTicketTags: true,
  },
  admin: {
    canManageUsers: true,
    canManageRoles: false,
    canViewAnalytics: true,
    canEditSettings: true,
    canCreateReports: true,
    canDeleteReports: true,
    canShareReports: true,
    canOverrideAdmin: false,
    canAccessAllData: false,
    canManageSubscriptions: true,
    canConfigureSystem: false,
    canCreateTickets: true,
    canViewAllTickets: true,
    canAssignTickets: true,
    canUpdateTicketStatus: true,
    canDeleteTickets: false,
    canManageTicketCategories: false,
    canViewInternalNotes: true,
    canAddInternalNotes: true,
    canSetTicketPriority: true,
    canManageTicketTags: true,
  },
  user: {
    canManageUsers: false,
    canManageRoles: false,
    canViewAnalytics: true,
    canEditSettings: false,
    canCreateReports: true,
    canDeleteReports: false,
    canShareReports: true,
    canOverrideAdmin: false,
    canAccessAllData: false,
    canManageSubscriptions: false,
    canConfigureSystem: false,
    canCreateTickets: true,
    canViewAllTickets: false,
    canAssignTickets: false,
    canUpdateTicketStatus: false,
    canDeleteTickets: false,
    canManageTicketCategories: false,
    canViewInternalNotes: false,
    canAddInternalNotes: false,
    canSetTicketPriority: false,
    canManageTicketTags: false,
  },
};

export const ACCESS_LEVELS = {
  FULL: 'full',
  ADMIN: 'admin',
  BASIC: 'basic',
} as const;

export type AccessLevel = typeof ACCESS_LEVELS[keyof typeof ACCESS_LEVELS]; 