import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

export function ProtectedRouteElement({ element, anonymous = false }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  const from = location.state?.from || '/';
  
  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to='/login' state={{from: location}} />
  }
  return element;
}