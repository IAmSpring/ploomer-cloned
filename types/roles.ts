import { PrismaClient } from '@prisma/client';

// Define UserRole enum to match Prisma schema
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

// Constants for role values
export const ROLES = {
  SUPER_ADMIN: UserRole.SUPER_ADMIN,
  ADMIN: UserRole.ADMIN,
  USER: UserRole.USER,
} as const;

// Base user data type
export type UserData = {
  email: string;
  name?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  role: UserRole;
};

// Prisma-specific types for operations
export type PrismaUserCreate = {
  email: string;
  name?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  role?: UserRole;
  password?: string;
};

export type PrismaUserUpdate = {
  email?: string;
  name?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  role?: UserRole;
  password?: string;
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

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  [UserRole.SUPER_ADMIN]: {
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
  [UserRole.ADMIN]: {
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
  [UserRole.USER]: {
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

// Extend Prisma Client types
declare global {
  namespace PrismaJson {
    type UserRole = typeof UserRole;
  }
} 