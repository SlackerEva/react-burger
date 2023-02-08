import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function BurgerConstructorRow(props) {
  const { name, price, image } = props.item;
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', listStyleType: 'none' }} className='mb-4 mr-1'>
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
      />
    </li>
  )
}

BurgerConstructorRow.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string
}

export default BurgerConstructorRow;