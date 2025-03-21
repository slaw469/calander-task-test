import {
  createRouter,
  RouterProvider,
  Outlet,
  createRootRoute,
  createRoute,
  createBrowserHistory,
} from '@tanstack/react-router';
import HabitTracker from './routes/HabitTracker';
import WelcomePage from './routes/WelcomePage';
import Layout from './components/layout';
import TimerPage from './routes/TimerPage';
import CalendarPage from './routes/CalendarPage';
import SettingsPage from './routes/SettingsPage';

// Root route with no layout
const rootRoute = createRootRoute({
  component: Outlet,
});

// Welcome page (no sidebar)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <Layout showSidebar={false}>
      <WelcomePage />
    </Layout>
  ),
});

// Layout with sidebar for authenticated routes
const authenticatedLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: 'authenticated',
  component: () => (
    <Layout showSidebar={true}>
      <Outlet />
    </Layout>
  ),
});

// Habits route (with sidebar)
const habitsRoute = createRoute({
  getParentRoute: () => authenticatedLayout,
  path: '/habits',
  component: HabitTracker,
});

// Additional routes for sidebar navigation using the extracted components
const timerRoute = createRoute({
  getParentRoute: () => authenticatedLayout,
  path: '/timer',
  component: TimerPage,
});

const calendarRoute = createRoute({
  getParentRoute: () => authenticatedLayout,
  path: '/calendar',
  component: CalendarPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => authenticatedLayout,
  path: '/settings',
  component: SettingsPage,
});

// Register the routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  authenticatedLayout.addChildren([
    habitsRoute,
    timerRoute,
    calendarRoute,
    settingsRoute,
  ]),
]);

// Create the router with the route tree and a browser history implementation
export const router = createRouter({
  routeTree,
  history: createBrowserHistory(),
});

// Main App component that renders the router
export function App() {
  return <RouterProvider router={router} />;
}
