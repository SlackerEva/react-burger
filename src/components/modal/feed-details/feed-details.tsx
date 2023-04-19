//import { useAppSelector } from '../../../utils/hooks';
import styles from './feed-details.module.css';
import OrderItemIcon from '../../orders/orders-item/orders-item-icon/orders-item-icon';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../utils/hooks';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../utils/hooks';
import { connect } from '../../../services/actions/ws-orders-action';
import { WSS_URL_ORDERS } from '../../../utils/constans';
import { getCookie } from '../../../utils/cookie';

function FeedDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const accessToken = getCookie("token");
  const storeIngr = useAppSelector((state) => state.ingredients.ingredients);
  const orderInfo = useAppSelector((state) => state.orders.orders.find((item) => item._id === id));
  const orderIng = storeIngr.filter((item) => {
    return orderInfo?.ingredients.includes(item._id);
  });
  const bun: any = orderIng?.find((obj) => obj.type === 'bun');
  const price = orderIng.reduce((acc, item) => acc + item.price, bun?.price ?? 0);
  const count = (item: any) => {
    let countNum = orderInfo?.ingredients.reduce((acc, itemIng) => item._id === itemIng ? acc += 1 : acc, 0);
    return countNum;
  }

  useEffect(() => {
    if (location.pathname === '/profile/orders' || location.pathname === `/profile/orders/${id}`) {
      let token = accessToken?.split(" ") ?? '';
      dispatch(connect(`${WSS_URL_ORDERS}?token=${token[1]}`));
    } else {
      dispatch(connect(`${WSS_URL_ORDERS}/all`));
    }
   },[dispatch, accessToken, id, location.pathname]);

  if (!orderInfo) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={`text text_type_digits-default pb-10 ${styles.number}`}>#{orderInfo.number}</p>
        <p className={`text text_type_main-medium pb-3 ${styles.p}`}>{orderInfo.name}</p>
        <p className={`text text_type_main-small pb-15 ${styles.status}`}>{orderInfo.status}</p>
        <p className={`text text_type_main-medium pb-6`}>Состав:</p>
        <div className={`mb-10 ${styles.scroll}`}>
          {orderIng.map((item) => (
            <div className={`pb-4 ${styles.row}`} key={item._id}>
              <OrderItemIcon ingr={item} />
              <p className={`text text_type_main-medium mr-4 ml-4 ${styles.name}`}>{item.name}</p>
              <div className={styles.price}>
                <p className={`text text_type_digits-default pr-2`}>{count(item)} x {item.price}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))}
        </div>
        <div className={`pb-10 ${styles.bottom}`}>
            <p className={`text text_type_main-default ${styles.data}`}>
              <FormattedDate date={new Date(orderInfo.createdAt)} />
            </p>
            <div className={`${styles.priceBox}`}>
              <p className={`text text_type_digits-default pr-2`}>{price}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
      </div>
    </section>
  );
}

export default FeedDetails;