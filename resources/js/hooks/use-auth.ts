import { usePage } from "@inertiajs/react";

export function useAuth() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { auth } = usePage().props as any
  return auth.user
}