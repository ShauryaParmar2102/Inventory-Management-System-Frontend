// ReactNode is a TypeScript type used to describe
// content/components passed inside another component
import type { ReactNode } from 'react';

// Import our typed Redux selector hook
import { useAppSelector } from '../../redux/hooks';

// Selector used to get the currently logged-in user
import { getCurrentUser } from '../../redux/services/authSlice';

// Navigate is used to redirect users to another route
import { Navigate } from 'react-router-dom';


// Protected route component that prevents unauthenticated users
// from accessing pages that require the user to be logged in
const ProtectRoute = ({ children }: { children: ReactNode }) => {

  // Get the currently logged-in user from the Redux store
  const user = useAppSelector(getCurrentUser);

  // If there is no logged-in user,
  // redirect them to the login page
  if (!user) {
    return <Navigate to='/login' replace={true} />;
  }

  // If the user is logged in,
  // display the protected page/component
  return children;
};


// Export the component so it can be used to protect other routes
export default ProtectRoute;