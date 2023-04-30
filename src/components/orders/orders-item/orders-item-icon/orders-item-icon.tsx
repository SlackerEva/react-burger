import styles from './orders-item-icon.module.css';
import { FC } from "react";
import { TIngredients } from '../../../../types/types';

interface IngredientIconProps {
  ingr: TIngredients;
}

const OrderItemIcon: FC<IngredientIconProps> = ({ingr}) => {
  const { image, name } = ingr;
  return (
    <div className={`${styles.container}`}>
        <picture className={`${styles.picture}`}>
          <img src={image} alt={name} width="112" height="56" />
        </picture>
    </div>
  );
}

export default OrderItemIcon;
