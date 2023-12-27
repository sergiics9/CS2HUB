import { useEffect } from 'react';
import { AppRoutes } from '../app.routes/app.routes';
import { useUsers } from '../../hooks/users/use.users';

export function App() {
  const { loginWithtoken } = useUsers();

  useEffect(() => {
    loginWithtoken();
  }, []);

  return <AppRoutes></AppRoutes>;
}
