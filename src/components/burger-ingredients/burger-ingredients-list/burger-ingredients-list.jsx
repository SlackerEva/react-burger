import BurgerIngredientCard from '../burger-ingredient-card/burger-ingredients-card.jsx';
import data from '../../../utils/data.js';
import PropTypes from 'prop-types';

function BurgerIngredientList(props) {
  const { title, type } = props;
  return(
    <>
      <h2 style={{ textAlign: 'start' }} className="text text_type_main-medium">{title}</h2>
      <ul style={{ display: 'flex', flexWrap: 'wrap', padding: 0, gap: '32px 24px'}} className="mb-10 mt-6 ml-4 mr-1">
        {
          data.filter(obj => obj.type === type).map(item => (
            <BurgerIngredientCard key={item._id} card={item} />
          ))
        }
      </ul>
    </>
  );
}

BurgerIngredientList.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
}

export default BurgerIngredientList;