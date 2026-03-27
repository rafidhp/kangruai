import type { PageProps } from "@inertiajs/core";
import { usePage } from "@inertiajs/react";

interface AuthProps extends PageProps {
  auth: {
    user: {
      id: number;
      username: string;
      name: string;
      email: string;
      role: string;
      is_active: boolean;
    } | null;
  }
}

export function useAuth() {
  const { auth } = usePage<AuthProps>().props;

  return {
    user: auth?.user ?? null,
  };
}