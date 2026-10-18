import { useSyncExternalStore } from 'react';

/**
 * Lightweight, zero-dependency hook to detect mobile viewport (<768px).
 * Uses useSyncExternalStore with native window.matchMedia for zero-render-cascade synchronization.
 */
export function useIsMobile(breakpoint = 768): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined') return () => {};
      const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
      mql.addEventListener('change', onStoreChange);
      return () => mql.removeEventListener('change', onStoreChange);
    },
    () => (typeof window !== 'undefined' ? window.innerWidth < breakpoint : false),
    () => false
  );
}
