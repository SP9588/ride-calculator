import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { Layout } from './components/Layout';
import { BookingFlow } from './pages/BookingFlow';

const rootRoute = createRootRoute({
  component: Layout
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: BookingFlow
});

const routeTree = rootRoute.addChildren([indexRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;

