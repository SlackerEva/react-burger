import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { FC } from 'react';
import { useAppSelector } from '../../../utils/hooks';

const IngredientDetails: FC = () => {
  const { id } = useParams();
  const { ingredients } = useAppSelector((store) => store.ingredients); 
  const ingrInfo = ingredients.find((item) => item._id === id);

  if (!ingrInfo) {
    return null;
  }

  return (
    <>
      <h2 className={`text text_type_main-large mr-10 mt-10 ml-10 ${styles.h2}`}>Детали ингредиента</h2>
      <img className={styles.img} src={ingrInfo.image} alt={ingrInfo.name} />
      <p className="text text_type_main-medium mt-4 mb-8">{ingrInfo.name}</p>
      <div className={` mb-15 ${styles.calories_container}`}>
        <div className={`mr-5 ${styles.calories_box}`}>
          <p className="text text_type_main-default text_color_inactive pb-2">Калории,ккал</p>
          <p className="text text_type_main-default text_color_inactive">{ingrInfo.calories}</p>
        </div>
        <div className={`mr-5 ${styles.calories_box}`}>
          <p className="text text_type_main-default text_color_inactive pb-2">Белки, г</p>
          <p className="text text_type_main-default text_color_inactive">{ingrInfo.proteins}</p>
        </div>
        <div className={`mr-5 ${styles.calories_box}`}>
          <p className="text text_type_main-default text_color_inactive pb-2">Жиры, г</p>
          <p className="text text_type_main-default text_color_inactive">{ingrInfo.fat}</p>
        </div>
        <div className={`${styles.calories_box}`}>
          <p className="text text_type_main-default text_color_inactive pb-2">Углеводы, г</p>
          <p className="text text_type_main-default text_color_inactive">{ingrInfo.carbohydrates}</p>
        </div>
      </div>
    </>
  );
}

export default IngredientDetails;