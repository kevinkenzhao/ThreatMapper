import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ErrorPage } from './components/error/ErrorPage';
import { forgotPasswordAction } from './components/routes/actions/forgotPasswordAction';
import { loginAction } from './components/routes/actions/loginAcrion';
import { AuthProvider } from './components/routes/auth';
import { rootAction, rootLoader } from './components/routes/home';
import PrivateRoutes, { RootRouteError } from './components/routes/PrivateRoutes';
import { ForgetPassword } from './pages/ForgetPassword';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { ThemeProvider, useThemeMode } from './theme/ThemeContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <PrivateRoutes />
      </AuthProvider>
    ),
    errorElement: <RootRouteError />,
    children: [
      {
        path: 'home',
        element: <Home />,
        loader: rootLoader,
        action: rootAction,
      },
    ],
  },
  {
    path: '/login',
    element: (
      <AuthProvider>
        <Login />
      </AuthProvider>
    ),
    errorElement: <ErrorPage errorType="server" />,
    action: loginAction,
  },
  {
    path: '/forgot-password',
    element: <ForgetPassword />,
    action: forgotPasswordAction,
  },
  {
    path: '*',
    element: <ErrorPage errorType="notFound" />,
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
