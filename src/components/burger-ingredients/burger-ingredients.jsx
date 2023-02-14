import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientCategory from './burger-ingredients-category/burger-ingredients-category.jsx';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import dataPropTypes from '../../utils/prop-types.js';

function BurgerIngredients(props) {
  const [current, setCurrent] = useState('one');
  return(
    <section className={styles.section}>
      <h1 className={`text text_type_main-large mb-5 ${styles.title}`}>Соберите бургер</h1>
      <div className={`mb-10 ${styles.container}`}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.scroll}>
        <BurgerIngredientCategory item={{title:'Булки', type:'bun', ingredients: props.ingredients}} />
        <BurgerIngredientCategory item={{title:'Соусы', type:'sauce', ingredients: props.ingredients}} />
        <BurgerIngredientCategory item={{title:'Начинки', type:'main', ingredients: props.ingredients}} />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired
}

export default BurgerIngredients;