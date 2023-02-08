import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientList from './burger-ingredients-list/burger-ingredients-list.jsx';
import styles from './burger-ingredients.module.css';

function BurgerIngredients() {
  const [current, setCurrent] = useState('one');

  return(
    <section style={{ maxWidth: 600 }}>
      <h1 style={{ textAlign: 'start' }} className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div style={{ display: 'inline-flex'}} className="mb-10">
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
        <BurgerIngredientList title='Булки' type='bun'/>
        <BurgerIngredientList title='Соусы' type='sauce'/>
        <BurgerIngredientList title='Начинки' type='main'/>
      </div>
    </section>
  );
}

export default BurgerIngredients;