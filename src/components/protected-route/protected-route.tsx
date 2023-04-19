import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";
import { FC } from 'react';

type TPRElement = {
  back?: any;
  element: JSX.Element;
  anonymous?: boolean;
}

const ProtectedRouteElement: FC<TPRElement> = ({ back, element, anonymous = false }) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  const from = location.state?.from || '/';

  if(back && !isLoggedIn) { return null; }

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} state={{from: location}} replace />
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to='/login' state={{from: location}} replace />
  }
  return element;
}

export default ProtectedRouteElement;