import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item.jsx';
import styles from './burger-constructor.module.css';
import { useState, useCallback } from 'react';
import Modal from '../modal/modal.jsx';
import OrderDetails from '../modal/order-details/order-details.jsx';
import {getOrderNumber} from '../../utils/burger-api.js';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import uuid from 'react-uuid';
import { getONumber, addIngredientData, updateIngredientData } from '../../services/reducers/reducers.js';

function BurgerConstructor() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.ingrData);
  const ingrArr = ingredients?.filter(obj => obj.item.type !== 'bun') ?? [];
  //const ingrArr = useMemo(()=> {return ingredients?.filter(obj => obj.type !== 'bun') ?? []}, [ingredients]);
  const bun = ingredients?.find(obj => obj.item.type === 'bun');
  const finalPrice = ingrArr?.reduce((acc, item) => acc + item.item.price, bun?.item.price*2 ?? 0);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = ingredients[dragIndex];
    const newCards = [...ingredients]
    newCards.splice(dragIndex, 1)
    newCards.splice(hoverIndex, 0, dragCard)
    dispatch(updateIngredientData(newCards));
  }, [ingredients, dispatch]);

  const [{ isHover }, dropTargerRef] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      dispatch(addIngredientData({item, dragId: uuid()}));
    } 
  })

  function handleOrderNumber() {
    let ing_Id = ingrArr.map(obj => obj.item._id);
    getOrderNumber(ing_Id)
      .then((data) => {
        dispatch(getONumber(data.order.number));
      })
      .catch('При оформлении заказа произошла ошибка');
    setIsOpen(true);
  }

  return (
    <section className={`styles.section ${isHover ? styles.onHover : ''}`} ref={dropTargerRef} >
      <div className={`mt-15 ml-4 ${styles.container}`}>
        {ingredients.length === 0  ? <p className="text text_type_main-medium">Выберите булку для бургера</p> :
          <>
            <ConstructorElement
              extraClass="ml-8 mb-4"
              type="top"
              isLocked={true}
              text={bun.item.name + " (верх)"}
              price={bun.item.price}
              thumbnail={bun.item.image}
            />
            <ul className={styles.scroll}>
              {ingrArr.map((item, index) => 
                (<BurgerConstructorItem key={item.dragId} index={index} item={item} moveCard={moveCard} />)
              )}
            </ul>
            <ConstructorElement
              extraClass="ml-8"
              type="bottom"
              isLocked={true}
              text={bun.item.name + " (низ)"}
              price={bun.item.price}
              thumbnail={bun.item.image}
            />
          
            <div className={`mt-10 ${styles.orderbox}`}>
              <div className={`mr-10 ${styles.summ}`}>
                <p className="text text_type_digits-medium">{finalPrice}</p>
                <CurrencyIcon type="primary" />
              </div>
              <Button htmlType="button" type="primary" size="large" onClick={() => handleOrderNumber()}>
                Оформить заказ
              </Button>
            </div>
          </> 
        }
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <OrderDetails />
        </Modal>)
      } 
    </section>
  )
}

export default BurgerConstructor;