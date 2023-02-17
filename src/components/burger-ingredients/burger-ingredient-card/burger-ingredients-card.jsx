import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import dataPropTypes from '../../../utils/prop-types.js';
import styles from './burger-ingredients-card.module.css';
import Modal from '../../modal/modal.jsx';
import { useState } from 'react';
import IngredientDetails from '../../modal/ingredient-details/ingredient-details.jsx';


function BurgerIngredientCard(props) {
  const { name, price, image } = props.card;
  const [isOpen, setIsOpen] = useState(false);
  return(
    <>
      <li className={styles.li} onClick={() => setIsOpen(true)}>
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
        <Modal onClose={() => setIsOpen(false)}>
          <IngredientDetails ingredient={props.card}/>
        </Modal>
      }
    </>
  );
}

BurgerIngredientCard.propTypes = {
  card: dataPropTypes.isRequired
}

export default BurgerIngredientCard;