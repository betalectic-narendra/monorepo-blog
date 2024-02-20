import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
const usePrivateRoute = (): void => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);
};

export default usePrivateRoute;
