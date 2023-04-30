import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';
import styles from './burger-constructor.module.css';
import { useState, useCallback } from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../modal/order-details/order-details';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { useDrop } from 'react-dnd';
import uuid from 'react-uuid';
//import { fetchOrderNumber } from '../../services/actions/actions';
import { fetchOrder } from '../../services/actions/actions';
import { addIngredientData, updateIngredientData, removeAllIngredientData } from '../../services/reducers/reducers';
import { clearOrder } from '../../services/reducers/ordersSlice';
import { useNavigate } from "react-router-dom";
import { TIngrData } from '../../types/types';



function BurgerConstructor() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ingrData } = useAppSelector((store) => store.ingredients); 
  const ingrArr = ingrData?.filter((obj) => obj.item.type !== 'bun') ?? [];
  const bun: any = ingrData?.find((obj) => obj.item.type === 'bun');
  const allIngrArr = [...ingrData, bun];
  const finalPrice = ingrArr?.reduce((acc, item ) => acc + item.item.price, bun?.item.price*2 ?? 0);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragCard = ingrData[dragIndex];
    const newCards = [...ingrData]
    newCards.splice(dragIndex, 1)
    newCards.splice(hoverIndex, 0, dragCard)
    dispatch(updateIngredientData(newCards));
  }, [ingrData, dispatch]);

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
    let ing_Id: string[] = allIngrArr.map((obj) => obj.item._id);
    dispatch(clearOrder());
    dispatch(fetchOrder(ing_Id));
    dispatch(removeAllIngredientData());
    setIsOpen(true);
  }

  const handleClick = () => {
    isLoggedIn ? handleOrderNumber() : navigate('/login');
  }

  return (
    <section className={`styles.section ${isHover ? styles.onHover : ''}`} ref={dropTargerRef} >
      <div className={`mt-15 ml-4 ${styles.container}`}>
        {ingrData.length === 0  ? <p className="text text_type_main-medium">Выберите булку для бургера</p> :
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
              {ingrArr.map((item: TIngrData, index: number) => 
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
              <Button htmlType="button" type="primary" size="large" onClick={handleClick}>
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