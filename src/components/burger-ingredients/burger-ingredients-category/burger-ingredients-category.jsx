import BurgerIngredientCard from '../burger-ingredient-card/burger-ingredients-card.jsx';
import data from '../../../utils/data.js';
import dataPropTypes from '../../../utils/prop-types.js';
import styles from './burger-ingredients-category.module.css';

function BurgerIngredientCategory(props) {
  const { title, type } = props.item;
  const category = data.filter(obj => obj.type === type);
  return(
    <>
      <h2 className={`text text_type_main-medium ${styles.title}`}>{title}</h2>
      <ul className={`mb-10 mt-6 ml-4 mr-1 ${styles.ul}`}>
        {
          category.map(item => (
            <BurgerIngredientCard key={item._id} card={item} />
          ))
        }
      </ul>
    </>
  );
}

BurgerIngredientCategory.propTypes = {
  title: dataPropTypes,
  type: dataPropTypes
}

export default BurgerIngredientCategory;