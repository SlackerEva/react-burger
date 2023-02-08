import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function BurgerIngredientCard(props) {
  const { _id, name, price, image } = props.card;
  return(
    <li style={{ listStyleType: 'none' }} key={_id}>
      <img className="pb-1 pl-4 pr-4" src={image} alt={name} />
      <div style={{ display: 'flex', justifyContent: 'center' }} className="pb-1">
        <p className="text text_type_digits-default pr-2">
          {price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p style={{ minHeight: '48px', maxWidth: '272px' }} className="text text_type_main-default">{name}</p>
    </li>
  );
}

BurgerIngredientCard.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string
}

export default BurgerIngredientCard;