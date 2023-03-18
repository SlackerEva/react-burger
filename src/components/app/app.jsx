import styles from './app.module.css';
import { HomePage, Login, Register, ForgotPass, ResetPass, Profile, NotFound } from '../pages/pages.js';
import { Routes, Route } from 'react-router-dom';
import AppHeader from "../app-header/app-header";
import { ProtectedRouteElement } from '../protected-route/protected-route.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/actions/actions';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
//import ModalSwitch from '../modal/modal-switch/modal-switch';
import { handleModalClose } from '../../services/reducers/reducers';
import Modal from '../modal/modal';
import { useLocation, useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect (() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleModal = () => {
    dispatch(handleModalClose());
    navigate("/");
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
        <Route path="/*" element={<NotFound />} />
      </Routes>
      
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={handleModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      {/* <ModalSwitch /> */}

    </div>
  );
}

export default App;