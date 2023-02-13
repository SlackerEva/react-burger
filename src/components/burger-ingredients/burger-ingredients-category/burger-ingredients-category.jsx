import BurgerIngredientCard from '../burger-ingredient-card/burger-ingredients-card.jsx';
import dataPropTypes from '../../../utils/prop-types.js';
import styles from './burger-ingredients-category.module.css';
import PropTypes from 'prop-types';

function BurgerIngredientCategory(props) {
  const { title, type, ingredients } = props.item;
  const category = ingredients?.filter(obj => obj.type === type) ?? [];
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
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
    ingredients: PropTypes.arrayOf(dataPropTypes).isRequired
  }),
}

export default BurgerIngredientCategory;