import styled from 'styled-components';
import useUser from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-gray-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isPending, isAuthenticated } = useUser();

  // Track if we're still checking authentication status
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // 2. If there is NO authenticated user, redirect to the/login
  useEffect(() => {
    // Only redirect if we're done checking and there's no user
    if (!isPending && !isAuthenticated && !isCheckingAuth) {
      navigate('/login');
    }

    // Mark that we've completed the initial auth check
    if (!isPending) {
      setIsCheckingAuth(false);
    }
  }, [isAuthenticated, isPending, navigate, isCheckingAuth]);

  // 3. While loading, show a spinner
  if (isPending || isCheckingAuth)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
