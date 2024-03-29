import styles from './app.module.css';
import { HomePage, Login, Register, ForgotPass, ResetPass, Profile, NotFound } from '../../pages/pages';
import { Routes, Route } from 'react-router-dom';
import AppHeader from "../app-header/app-header";
import ProtectedRouteElement from '../protected-route/protected-route';
import { useAppDispatch } from '../../utils/hooks';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/actions/actions';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import { handleModalClose } from '../../services/reducers/reducers';
import Modal from '../modal/modal';
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from '../../utils/cookie';
import { fetchGetUser } from '../../services/actions/authActions';
import Orders from '../orders/orders';
import FeedDetails from '../modal/feed-details/feed-details';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect (() => {
    dispatch(fetchIngredients());
    if (getCookie('token')) {
      dispatch(fetchGetUser());
    }
  }, [dispatch]);

  const handleModal = (path: string) => {
    dispatch(handleModalClose());
    navigate(path ?? '/');
  }  

  return (
    <div className={styles.app}>  
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ProtectedRouteElement anonymous element={<ForgotPass />}/>} />
        <Route path="/reset-password" element={<ProtectedRouteElement anonymous element={<ResetPass />}/>} />
        <Route path="/profile" element={<ProtectedRouteElement element={<Profile />}/>} />
        <Route path="/profile/orders" element={<ProtectedRouteElement back={background} element={<Profile />}/>} />
        <Route path="/profile/orders/:id" element={<ProtectedRouteElement  element={<FeedDetails />}/>} />
        <Route path="/feed" element={<Orders />} />
        <Route path="/feed/:id" element={<FeedDetails />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={() => handleModal('/')}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Modal onClose={() => handleModal('/feed')}>
                <FeedDetails />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <Modal onClose={() => handleModal('/profile/orders')}>
                <FeedDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;