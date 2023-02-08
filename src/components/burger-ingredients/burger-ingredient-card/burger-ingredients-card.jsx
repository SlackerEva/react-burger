import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import dataPropTypes from '../../../utils/prop-types.js';
import styles from './burger-ingredients-card.module.css';

function BurgerIngredientCard(props) {
  const { name, price, image } = props.card;
  return(
    <li className={styles.li}>
      <img className="pb-1 pl-4 pr-4" src={image} alt={name} />
      <div className={`pb-1 ${styles.container}`}>
        <p className="text text_type_digits-default pr-2">
          {price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${styles.title}`}>{name}</p>
    </li>
  );
}

BurgerIngredientCard.propTypes = {
  name: dataPropTypes,
  price: dataPropTypes,
  image: dataPropTypes
}

export default BurgerIngredientCard;