import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';

import { authAction, authLoader, AuthProvider } from './components/routes/auth';
import { rootAction, rootLoader } from './components/routes/home';
import PrivateRoutes, { RootRouteError } from './components/routes/PrivateRoutes';
import { ForgetPassword } from './pages/ForgetPassword';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { ThemeProvider, useThemeMode } from './theme/ThemeContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <RootRouteError />,
    loader: rootLoader,
    action: rootAction,
  },
  {
    path: '/login',
    element: <Login />,
    loader: authLoader,
    action: authAction,
  },
  {
    path: '/forget-password',
    element: <ForgetPassword />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  const { toggleMode } = useThemeMode(true);

  return (
    <ThemeProvider value={{ toggleMode }}>
      <div className="h-screen dark:bg-gray-900 bg-gray-200">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
