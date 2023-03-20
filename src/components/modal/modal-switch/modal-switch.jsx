import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HomePage } from '../../../pages/home';
import NotFound from '../../../pages/404';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { handleModalClose } from '../../../services/reducers/reducers';
import Modal from '../modal';

const ModalSwitch = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let background = location.state && location.state.background;
 
  const handleModal = () => {
    dispatch(handleModalClose());
    navigate("/");
  }
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {background && (
        // <Routes>
          <Route path="/ingredients/:id"  element={
            <Modal onClose={handleModal}>
              <IngredientDetails />
            </Modal>
          } />
        // </Routes>
      )}
    </>
  );
}

export default ModalSwitch;