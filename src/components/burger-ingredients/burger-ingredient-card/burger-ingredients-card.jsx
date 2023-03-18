import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import dataPropTypes from '../../../utils/prop-types.js';
import styles from './burger-ingredients-card.module.css';
import Modal from '../../modal/modal.jsx';
import IngredientDetails from '../../modal/ingredient-details/ingredient-details.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { useLocation } from "react-router-dom";
import { handleModalClose } from '../../../services/reducers/reducers.js';
import { Link } from 'react-router-dom';


function BurgerIngredientCard(props) {
  const { _id, name, price, image } = props.card;
  const dispatch = useDispatch();
  const location = useLocation();
  const isOpen = useSelector((state) => state.ingredients.isModalOpen);
  const ingredients = useSelector((state) => state.ingredients.ingrData);
  const countIngr = ingredients.reduce((acc, item) => {return item.item._id === _id ? acc + 1 : acc}, 0);
  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...props.card },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  function handleClose() {
    dispatch(handleModalClose());
  }

  // function handleOpen() {
  //   dispatch(handleModalOpen());
  // }

  return(
    <Link key={_id} to={{pathname: `/ingredients/${_id}`, state: { background: location }}} className={`${styles.link}`}>
      {/* <li ref={dragRef} style={{ opacity }} className={styles.li} onClick={handleOpen}> */}
      <li ref={dragRef} style={{ opacity }} className={styles.li}>
      {countIngr !== 0 && <span className={`text text_type_main-default ${styles.number}`}>{countIngr}</span>}
        <img className="pb-1 pl-4 pr-4" src={image} alt={name} />
        <div className={`pb-1 ${styles.container}`}>
          <p className="text text_type_digits-default pr-2">
            {price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${styles.title}`}>{name}</p>
      </li>
      {isOpen && 
        <Modal onClose={handleClose}>
          <IngredientDetails card={props.card} />
        </Modal>
      }
    </Link>
  );
}

BurgerIngredientCard.propTypes = {
  card: dataPropTypes.isRequired
}

export default BurgerIngredientCard;
