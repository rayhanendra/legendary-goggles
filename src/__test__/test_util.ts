import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { NextRouter } from 'next/router';

// Note: naive implementation of NextRouter for testing purposes only and still does not work.
export function createMockRouter(
  router: Partial<NextRouter>
): AppRouterInstance {
  return {
    back: jest.fn() as () => void,
    forward: jest.fn() as () => void,
    refresh: jest.fn() as () => void,
    push: jest.fn() as any,
    replace: jest.fn() as any,
    prefetch: jest.fn() as any,

    ...router,
  };
}
