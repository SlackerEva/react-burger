import styles from './orders-item.module.css';
import OrdersItemIcon from './orders-item-icon/orders-item-icon';
import { FC } from 'react';
import { useLocation, Link } from "react-router-dom";
import { useAppSelector } from '../../../utils/hooks';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrderData } from '../../../types/types';

type TOrderItem = {
  item: TOrderData;
}

const OrdersItem: FC<TOrderItem> = ({item}) =>  {
  const location = useLocation();
  const { _id, number, name, createdAt, ingredients } = item;
  const storeIngr = useAppSelector((state) => state.ingredients.ingredients);
  const orderIng = storeIngr.filter((item: any) => {
    return ingredients.includes(item._id);
  });
  const bun: any = orderIng?.find((obj: any) => obj.type === 'bun');
  const price = orderIng.reduce((acc: number, item: any) => acc + item.price, bun?.price ?? 0);

  return (
    <Link key={_id} to={{pathname: `/feed/${_id}`}} state={{ background : location }} className={`${styles.link}`}>
      <div className={`p-6 mb-4 ${styles.container}`}>
        <div className={`text text_type_digits-default mb-6 ${styles.number}`}>
          <p className={`text text_type_main-medium ${styles.p}`}>#{number}</p>
          <p className={`text text_type_main-medium text_color_inactive ${styles.p}`}>
            <FormattedDate date={new Date(createdAt)} />
          </p>
        </div>
        <p className={`text text_type_main-medium mb-6 ${styles.title}`}>{name}</p>
        <div className={`${styles.box}`}>
          <div className={`${styles.items_list}`}>
            {orderIng.map((ingr:any) => (
              <OrdersItemIcon key={ingr._id} ingr={ingr} />
            ))}
          </div>
          <div className={`${styles.price}`}>
            <p className={`text text_type_digits-default pr-2`}>{price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default OrdersItem;