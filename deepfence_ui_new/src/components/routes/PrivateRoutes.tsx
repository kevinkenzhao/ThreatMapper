import { Navigate, Outlet, useLocation, useRouteError } from 'react-router-dom';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { Typography } from '../typography/Typography';
import { AuthUserType } from './auth';

const RootOutlet = () => {
  return (
    <div>
      <div className="w-full bg-gray-500 fixed h-[48px]">Header Portion</div>
      <div className="w-[200px] h-screen bg-gray-500 fixed mt-[48px]">Sidebar</div>
      <div className="ml-[200px] pt-[48px] relative">
        <Outlet />
      </div>
    </div>
  );
};

const PrivateRoutes = () => {
  const [user] = useLocalStorage<AuthUserType>('user', {
    auth: false,
  });
  const location = useLocation();

  if (!user?.auth) {
    return <Navigate to="/login" replace />;
  }

  if (location.pathname === '/') {
    return <Navigate to="/home" replace />;
  }
  return <RootOutlet />;
};

export const RootRouteError = () => {
  const error = useRouteError() as Error;
  console.warn(error.message);
  return (
    <div>
      <h1 className={`${Typography.size['6xl']} ${Typography.weight.bold}`}>
        <pre>Please try in sometime.</pre>
      </h1>
    </div>
  );
};

export default PrivateRoutes;
