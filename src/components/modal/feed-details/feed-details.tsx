//import { useAppSelector } from '../../../utils/hooks';
import styles from './feed-details.module.css';
import OrderItemIcon from '../../orders/orders-item/orders-item-icon/orders-item-icon';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../utils/hooks';
import { TOrderData } from '../../../types/types';

function FeedDetails() {
  const { id } = useParams();
  const storeIngr = useAppSelector((state) => state.ingredients.ingredients);
  const orderInfo = useAppSelector((state: any) => state.orders.orders.find((item: TOrderData) => item._id === id));
  const orderIng = storeIngr.filter((item: any) => {
    return orderInfo.ingredients.includes(item._id);
  });
  const bun: any = orderIng?.find((obj: any) => obj.type === 'bun');
  const price = orderIng.reduce((acc: number, item: any) => acc + item.price, bun?.price ?? 0);
  const count = (item: any) => {
    let countNum = orderInfo.ingredients.reduce((acc: number, itemIng: string) => item._id === itemIng ? acc += 1 : acc, 0);
    return countNum;
  }

  if (!orderInfo) return <></>;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={`text text_type_digits-default pb-10 ${styles.number}`}>#{orderInfo.number}</p>
        <p className={`text text_type_main-medium pb-3 ${styles.p}`}>{orderInfo.name}</p>
        <p style={{color: '#00CCCC'}} className={`text text_type_main-small pb-15`}>{orderInfo.status}</p>
        <p className={`text text_type_main-medium pb-6`}>Состав:</p>
        <div className={`mb-10 ${styles.scroll}`}>
          {orderIng.map((item: any) => (
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
            <p style={{color: '#8585AD'}} className={`text text_type_main-default`}>
              <FormattedDate date={new Date(orderInfo.createdAt)} />
            </p>
            <div style={{display: 'flex'}}>
              <p className={`text text_type_digits-default pr-2`}>{price}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
      </div>
    </section>
  );
}

export default FeedDetails;