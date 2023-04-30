import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-card.module.css';
import { useAppSelector } from '../../../utils/hooks';
import { useDrag } from 'react-dnd';
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { TIngredients } from '../../../types/types';

type TBICardProps = {
  card: TIngredients;
}

const BurgerIngredientCard: FC<TBICardProps>  = (props) => {
  const { _id, name, price, image } = props.card;
  const location = useLocation();
  const ingredients = useAppSelector((state) => state.ingredients.ingrData);
  const countIngr = ingredients.reduce((acc, item) => {return item.item._id === _id ? acc + 1 : acc}, 0);
  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...props.card },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  return(
    <Link key={_id} to={{pathname: `/ingredients/${_id}`}} state={{ background : location }} className={`${styles.link}`}>
    <li ref={dragRef} style={{ opacity }} className={styles.li}>
    {countIngr !== 0 && <span className={`text text_type_main-default ${styles.number}`}>{countIngr}</span>}
      <img className="pb-1 pl-4 pr-4" src={image} alt={name} />
      <div className={`pb-1 ${styles.container}`}>
        <p className="text text_type_digits-default pr-2">
          {price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${styles.title}`}>{name}</p>
    </li>
    </Link>
  );
}

export default BurgerIngredientCard;
