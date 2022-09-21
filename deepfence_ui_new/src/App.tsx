import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './components/routes/auth';
import PrivateRoutes, { RootRouteError } from './components/routes/PrivateRoutes';
import { ForgetPassword } from './pages/ForgetPassword';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import theme from './theme/default';
import { ThemeProvider, useThemeMode } from './theme/ThemeContext';

const queryClient = new QueryClient();

function App() {
  const { toggleMode } = useThemeMode(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={{ theme, toggleMode }}>
        <div className="h-screen">
          <Router>
            <Routes>
              <Route
                element={
                  <AuthProvider>
                    <PrivateRoutes />
                  </AuthProvider>
                }
                errorElement={<RootRouteError />}
              >
                <Route element={<Home />} path="/home" />
              </Route>
              <Route element={<Login />} path="/login" />
              <Route element={<ForgetPassword />} path="/forget-password" />
              <Route element={<NotFound />} path="*" />
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
