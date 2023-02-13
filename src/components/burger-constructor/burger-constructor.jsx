import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item.jsx';
import styles from './burger-constructor.module.css';
import { useState } from 'react';
import Modal from '../modal/modal.jsx';
import { createPortal } from 'react-dom';
import OrderDetails from '../modal/order-details/order-details.jsx';
import PropTypes from 'prop-types';
import dataPropTypes from '../../utils/prop-types.js';
const modalRoot = document.getElementById("react-modals");


function BurgerConstructor(props) {
  const [isOpen, setIsOpen] = useState(false);
  const ingredients = props.ingredients?.filter(obj => obj.type !== 'bun') ?? [];
  const bunImg = props.ingredients?.[0].image ?? '';

  return (
    
    <section className={styles.section}>
      <div className={`mt-15 ml-4 ${styles.container}`}>
        <ConstructorElement
          extraClass="ml-8 mb-4"
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={bunImg}
        />
        <ul className={styles.scroll}>
          {
            ingredients.map(item => (
              <BurgerConstructorItem key={item._id}  item={item} />
            ))
          }
        </ul>
        <ConstructorElement
          extraClass="ml-8"
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={bunImg}
        />
      </div>
      <div className={`mt-10 ${styles.orderbox}`}>
        <div className={`mr-10 ${styles.summ}`}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={() => setIsOpen(true)}>
          Оформить заказ
        </Button>
      </div>
      {isOpen && createPortal(<Modal onClose={() => setIsOpen(false)} children={<OrderDetails />} />, modalRoot)}
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(dataPropTypes).isRequired
}


export default BurgerConstructor;