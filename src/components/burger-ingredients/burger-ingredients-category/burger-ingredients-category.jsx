import BurgerIngredientCard from '../burger-ingredient-card/burger-ingredients-card.jsx';
import styles from './burger-ingredients-category.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function BurgerIngredientCategory(props) {
  const { title, type } = props.item;
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const category = ingredients?.filter(obj => obj.type === type) ?? [];
  return(
    <div className='section' id={type}>
      <h2 className={`text text_type_main-medium ${styles.title}`}>{title}</h2>
      <ul className={`mb-10 mt-6 ml-4 mr-1 ${styles.ul}`}>
        {category.map(item => (
            <BurgerIngredientCard key={item._id} card={item} />
        ))}
      </ul>
    </div>
  );
}

BurgerIngredientCategory.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired
  }),
}

export default BurgerIngredientCategory;