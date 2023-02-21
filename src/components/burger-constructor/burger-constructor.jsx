import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item.jsx';
import styles from './burger-constructor.module.css';
import { useState, useContext } from 'react';
import { IngredientsContext } from '../../utils/ingredientsContext.js';
import Modal from '../modal/modal.jsx';
import OrderDetails from '../modal/order-details/order-details.jsx';
import {getOrderNumber} from '../../utils/burger-api.js';
// import PropTypes from 'prop-types';
// import dataPropTypes from '../../utils/prop-types.js';


function BurgerConstructor() {
  const [isOpen, setIsOpen] = useState(false);
  const [orderData, setOrderData] = useState();
  const ingredients = useContext(IngredientsContext);
  const ingrArr = ingredients?.filter(obj => obj.type !== 'bun') ?? [];
  const bun = ingredients.find(obj => obj.type === 'bun');
  const finalPrice = ingrArr.reduce((acc, item) => acc + item.price, bun.price*2)

  function handleOrderNumber() {
    let ing_Id = ingrArr.map(obj => obj._id);
    ing_Id.push(bun._id);
    getOrderNumber(ing_Id)
      .then((data) => {
        setOrderData(data.order.number);
      })
      .catch('При оформлении заказа произошла ошибка');
  }

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
          {ingrArr.map(item => 
            (<BurgerConstructorItem key={item._id}  item={item} />)
          )}
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
          <p className="text text_type_digits-medium">{finalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={() => {
          handleOrderNumber();
          setIsOpen(true);
        }}>
          Оформить заказ
        </Button>
      </div>
      {isOpen && 
        <Modal onClose={() => setIsOpen(false)}>
          <OrderDetails orderData={orderData} />
        </Modal>
      }
    </section>
  )
}

// BurgerConstructor.propTypes = {
//   ingredients: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired
// }


export default BurgerConstructor;