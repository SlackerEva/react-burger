import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { FC } from 'react';
import { TIngredients } from '../../../types/types';
import { useAppSelector } from '../../../utils/hooks';

type TCard = {
  key?: string;
  card?: TIngredients;
}

const IngredientDetails: FC<TCard> = (props) => {
  const { id } = useParams();
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);
  const ingrInfo: any = ingredients?.find((item: TIngredients) => item._id === id);
  const { name, image, calories, proteins, fat, carbohydrates } = ingrInfo || props.card;

  return (
    <>
      <h2 className={`text text_type_main-large mr-10 mt-10 ml-10 ${styles.h2}`}>Детали ингредиента</h2>
      <img className={styles.img} src={image} alt={name} />
      <p className="text text_type_main-medium mt-4 mb-8">{name}</p>
      <div className={` mb-15 ${styles.calories_container}`}>
        <div className={`mr-5 ${styles.calories_box}`}>
          <p className="text text_type_main-default text_color_inactive pb-2">Калории,ккал</p>
          <p className="text text_type_main-default text_color_inactive">{calories}</p>
        </div>
        <div className={`mr-5 ${styles.calories_box}`}>
          <p className="text text_type_main-default text_color_inactive pb-2">Белки, г</p>
          <p className="text text_type_main-default text_color_inactive">{proteins}</p>
        </div>
        <div className={`mr-5 ${styles.calories_box}`}>
          <p className="text text_type_main-default text_color_inactive pb-2">Жиры, г</p>
          <p className="text text_type_main-default text_color_inactive">{fat}</p>
        </div>
        <div className={`${styles.calories_box}`}>
          <p className="text text_type_main-default text_color_inactive pb-2">Углеводы, г</p>
          <p className="text text_type_main-default text_color_inactive">{carbohydrates}</p>
        </div>
      </div>
    </>
  );
}

export default IngredientDetails;