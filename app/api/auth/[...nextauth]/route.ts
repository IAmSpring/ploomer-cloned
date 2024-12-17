import NextAuth, { DefaultSession, AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';
import EmailProvider from 'next-auth/providers/email';
import { prisma } from '@/lib/prisma';
import { ROLES, Role, ROLE_PERMISSIONS, RolePermissions } from '@/types/roles';
import type { JWT } from 'next-auth/jwt';
import type { Session, User, Account, Profile } from 'next-auth';
import type { Prisma } from '@prisma/client';

// Environment configuration
const NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';
const isDevelopment = process.env.NODE_ENV === 'development';
const isLocalhost = NEXTAUTH_URL.includes('localhost') || NEXTAUTH_URL.includes('127.0.0.1');

// Extend the built-in session types
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
      permissions: RolePermissions;
    } & DefaultSession['user']
  }

  interface User {
    id: string;
    role: Role;
    email: string;
  }
}

// Extend JWT type
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: Role;
    permissions: RolePermissions;
  }
}

// Helper function to determine user role
const determineUserRole = (email: string): Role => {
  if (isDevelopment && email.endsWith('@dev.local')) {
    if (email.startsWith('superadmin')) {
      return ROLES.SUPER_ADMIN;
    }
    if (email.startsWith('admin')) {
      return ROLES.ADMIN;
    }
  }
  
  // Special domain checks for production
  const specialDomains = process.env.ADMIN_DOMAINS?.split(',') || [];
  if (!isDevelopment && specialDomains.some(domain => email.endsWith(domain))) {
    return ROLES.ADMIN;
  }

  return ROLES.USER;
};

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: { scope: 'r_emailaddress r_liteprofile' }
      }
    }),
    EmailProvider({
      server: isDevelopment || isLocalhost ? {
        host: process.env.EMAIL_SERVER_HOST || 'localhost',
        port: parseInt(process.env.EMAIL_SERVER_PORT || '1025'),
        auth: {
          user: process.env.EMAIL_SERVER_USER || 'test',
          pass: process.env.EMAIL_SERVER_PASSWORD || 'test',
        },
        secure: false,
      } : {
        host: process.env.EMAIL_SERVER_HOST!,
        port: parseInt(process.env.EMAIL_SERVER_PORT!),
        auth: {
          user: process.env.EMAIL_SERVER_USER!,
          pass: process.env.EMAIL_SERVER_PASSWORD!,
        },
        secure: true,
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user?.email) return false;
      const role = determineUserRole(user.email);
      try {
        if (user.id) {
          await prisma.user.update({
            where: { id: user.id },
            data: { role } as Prisma.UserUpdateInput,
          });
        }
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id;
        session.user.role = user.role;
        session.user.permissions = ROLE_PERMISSIONS[user.role];
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.permissions = ROLE_PERMISSIONS[user.role];
      }
      return token;
    },
  },
  events: {
    async createUser({ user }) {
      if (!user.email) {
        throw new Error('User email is required');
      }

      const role = determineUserRole(user.email);
      
      try {
        await prisma.$transaction(async (tx) => {
          await tx.user.update({
            where: { id: user.id },
            data: {
              role,
              settings: {
                create: {
                  theme: 'light',
                  notifications: true,
                  emailNotifications: true,
                  accessLevel: role === ROLES.SUPER_ADMIN ? 'full' : 
                             role === ROLES.ADMIN ? 'admin' : 'basic',
                },
              },
            } as Prisma.UserUpdateInput,
          });
        });
      } catch (error) {
        console.error('Error in createUser event:', error);
        throw error;
      }
    },
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: isDevelopment ? 7 * 24 * 60 * 60 : 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: `${isDevelopment || isLocalhost ? '' : '__Secure-'}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: !(isDevelopment || isLocalhost),
      },
    },
  },
  debug: isDevelopment,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 