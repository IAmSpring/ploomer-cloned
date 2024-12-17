import { useSession } from 'next-auth/react';

export function useAdmin() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'admin';
  const isSuperAdmin = session?.user?.role === 'super_admin';

  return {
    isAdmin,
    isSuperAdmin,
    session
  };
} 