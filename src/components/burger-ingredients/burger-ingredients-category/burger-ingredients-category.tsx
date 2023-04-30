import BurgerIngredientCard from '../burger-ingredient-card/burger-ingredients-card';
import styles from './burger-ingredients-category.module.css';
import { forwardRef } from 'react';
import { FC } from 'react';
import { useAppSelector } from '../../../utils/hooks';

type TBICategory = {
  title: string;
  type: string;
  ref: any;
}

const BurgerIngredientCategory: FC<TBICategory> = forwardRef((props, ref: any) => {
  const { title, type } = props;
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);
  const category = ingredients?.filter((obj) => obj.type === type) ?? [];
  return(
    <div className='section' id={type} ref={ref}>
      <h2 className={`text text_type_main-medium ${styles.title}`}>{title}</h2>
      <ul className={`mb-10 mt-6 ml-4 mr-1 ${styles.ul}`}>
        {category.map((item) => (
          <BurgerIngredientCard key={item._id} card={item} />
        ))}
      </ul>
    </div>
  );
})

export default BurgerIngredientCategory;