import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item.jsx';
import styles from './burger-constructor.module.css';
import { useState } from 'react';
import Modal from '../modal/modal.jsx';
import OrderDetails from '../modal/order-details/order-details.jsx';
import PropTypes from 'prop-types';
import dataPropTypes from '../../utils/prop-types.js';


function BurgerConstructor(props) {
  const [isOpen, setIsOpen] = useState(false);
  const ingredients = props.ingredients?.filter(obj => obj.type !== 'bun') ?? [];
  const bun = props.ingredients.find(obj => obj.type === 'bun');
  return (
    
    <section className={styles.section}>
      <div className={`mt-15 ml-4 ${styles.container}`}>
        <ConstructorElement
          extraClass="ml-8 mb-4"
          type="top"
          isLocked={true}
          text={bun.name + " (верх)"}
          price={bun.price}
          thumbnail={bun.image}
        />
        <ul className={styles.scroll}>
          {ingredients.map(item => (
            <BurgerConstructorItem key={item._id}  item={item} />
          ))}
        </ul>
        <ConstructorElement
          extraClass="ml-8"
          type="bottom"
          isLocked={true}
          text={bun.name + " (низ)"}
          price={bun.price}
          thumbnail={bun.image}
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
      {isOpen && 
        <Modal onClose={() => setIsOpen(false)}>
          <OrderDetails />
        </Modal>
      }
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired
}


export default BurgerConstructor;