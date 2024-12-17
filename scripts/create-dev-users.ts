import { PrismaClient } from '@prisma/client';
import { ROLES, type PrismaUserCreate, type PrismaUserUpdate } from '@/types/roles';

const prisma = new PrismaClient();

async function createDevUsers() {
  try {
    // Create super admin user
    const superAdminData: PrismaUserCreate = {
      email: 'superadmin@dev.local',
      name: 'Super Admin',
      emailVerified: new Date(),
      role: ROLES.SUPER_ADMIN,
    };

    await prisma.user.upsert({
      where: { email: superAdminData.email },
      create: superAdminData,
      update: {
        name: superAdminData.name,
        role: ROLES.SUPER_ADMIN,
      } as PrismaUserUpdate,
    });

    // Create admin user
    const adminData: PrismaUserCreate = {
      email: 'admin@dev.local',
      name: 'Admin User',
      emailVerified: new Date(),
      role: ROLES.ADMIN,
    };

    await prisma.user.upsert({
      where: { email: adminData.email },
      create: adminData,
      update: {
        name: adminData.name,
        role: ROLES.ADMIN,
      } as PrismaUserUpdate,
    });

    // Create regular user
    const userData: PrismaUserCreate = {
      email: 'user@dev.local',
      name: 'Regular User',
      emailVerified: new Date(),
      role: ROLES.USER,
    };

    await prisma.user.upsert({
      where: { email: userData.email },
      create: userData,
      update: {
        name: userData.name,
        role: ROLES.USER,
      } as PrismaUserUpdate,
    });

    // Create demo users for each provider
    const providers = ['google', 'linkedin', 'email'] as const;
    for (const provider of providers) {
      const demoUserData: PrismaUserCreate = {
        email: `demo-${provider}@dev.local`,
        name: `Demo ${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        emailVerified: new Date(),
        role: ROLES.USER,
        accounts: {
          create: {
            type: 'oauth',
            provider,
            providerAccountId: `demo-${provider}-id`,
            access_token: 'demo-token',
            token_type: 'bearer',
          },
        },
      };

      await prisma.user.upsert({
        where: { email: demoUserData.email },
        create: demoUserData,
        update: {
          name: demoUserData.name,
          role: ROLES.USER,
        } as PrismaUserUpdate,
      });
    }

    console.log('✅ Development users created successfully');
  } catch (error) {
    console.error('Error creating development users:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createDevUsers(); 