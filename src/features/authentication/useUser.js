import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '../../services/apiAuth';

const useUser = () => {
  const { data: user, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser
  });

  return { user, isPending, isAuthenticated: user?.role === 'authenticated' };
};

export default useUser;
