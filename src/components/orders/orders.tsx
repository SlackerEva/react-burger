import styles from './orders.module.css';
import OrdersItem from './orders-item/orders-item';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { connect } from '../../services/actions/ws-orders-action';
import { useEffect } from 'react';
import {TOrderData} from '../../types/types';

function Orders() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.orders);
  const allOrders = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(connect("wss://norma.nomoreparties.space/orders/all"));
  }, [dispatch]);

  let statusDone: TOrderData[] | [] = [];
  let statusPending: TOrderData[] | [] = [];

  orders.forEach((item) => {  
    if (item.status === 'done' && statusDone.length <= 9) {
      statusDone = [...statusDone, item]
    }

    if (item.status === 'pending' && statusPending.length <= 9) {
      statusPending = [...statusPending, item]
    }
  })

  return (
    <>
      <h1 className={`text text_type_main-large mb-5 ${styles.title} ${styles.main}`}>Лента заказов</h1>
      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.scroll}>
           {orders.map((item: TOrderData) => (
             <OrdersItem key={item._id} item={item}/>
           ))}
          </div>
        </section>
        <section className={styles.section}>
          <div className={`mb-15 ${styles.container}`}>
            <div className={styles.box}>
              <p className={`text text_type_main-medium pb-6 ${styles.p}`}>Готовы:</p>
              <div className={`${styles.ul}`}>
                {statusDone.map((item) => (
                  <p style={{color: '#00CCCC'}} key={item.number} className={`text text_type_main-medium pb-2 ${styles.li}`}>{item.number}</p>
                ))}
              </div>
            </div>
            <div>
              <p className={`text text_type_main-medium pb-6 ${styles.p}`}>В работе:</p>
              <div className={`${styles.ul}`}>
                {statusPending.map((item) => (
                  <p key={item.number} className={`text text_type_main-medium pb-2 ${styles.li}`}>{item.number}</p>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className={`text text_type_main-medium ${styles.paragraph}`}>Выполнено за все время:</p>
            <p className={`text text_type_digits-large pb-6 ${styles.paragraph}`}>{allOrders.ordersTotal}</p>
          </div>
          <div>
            <p className={`text text_type_main-medium ${styles.paragraph}`}>Выполнено за сегодня:</p>
            <p className={`text text_type_digits-large ${styles.paragraph}`}>{allOrders.ordersTotalToday}</p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Orders;