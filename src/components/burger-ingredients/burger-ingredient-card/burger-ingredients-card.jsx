import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import dataPropTypes from '../../../utils/prop-types.js';
import styles from './burger-ingredients-card.module.css';
import Modal from '../../modal/modal.jsx';
import { useState } from 'react';
import IngredientDetails from '../../modal/ingredient-details/ingredient-details.jsx';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

function BurgerIngredientCard(props) {
  const { _id, name, price, image } = props.card;
  const [isOpen, setIsOpen] = useState(false);
  const ingredients = useSelector((state) => state.ingredients.ingrData);
  const countIngr = ingredients.reduce((acc, item) => {return item.item._id === _id ? acc + 1 : acc}, 0);
  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...props.card },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  function handleOpenMadal() {
    setIsOpen(true);
  }

  function handleCloseMadal() {
    setIsOpen(false);
  }

  return(
    <>
      <li ref={dragRef} style={{ opacity }} className={styles.li} onClick={handleOpenMadal}>
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
        <Modal onClose={handleCloseMadal}>
          <IngredientDetails card={props.card} />
        </Modal>
      }
    </>
  );
}

BurgerIngredientCard.propTypes = {
  card: dataPropTypes.isRequired
}

export default BurgerIngredientCard;
