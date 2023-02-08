import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import dataPropTypes from '../../../utils/prop-types.js';
import style from './burger-constructor-item.module.css';

function BurgerConstructorItem(props) {
  const { name, price, image } = props.item;
  return (
    <li className={`mb-4 mr-1 ${style.li}`}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
      />
    </li>
  )
}

BurgerConstructorItem.propTypes = {
  name: dataPropTypes,
  price: dataPropTypes,
  image: dataPropTypes
}

export default BurgerConstructorItem;