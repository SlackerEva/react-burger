import { useEffect, useState, useRef  } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientCategory from './burger-ingredients-category/burger-ingredients-category.jsx';
import styles from './burger-ingredients.module.css';

function BurgerIngredients() {
  const [current, setCurrent] = useState('bun');
  const bunRef = useRef(null);
  const souceRef = useRef(null);
  const mainRef = useRef(null);
  useEffect(() => {
    const refsArr = [bunRef.current, souceRef.current, mainRef.current];
    const sections = [];
    let observer = new IntersectionObserver((entrys) => {
      for (const entry of entrys) {
        sections[entry.target.id] = entry.isIntersecting;
      }
      for (const section in sections) {
        if (sections[section]) {
          setCurrent(section);
          break;
        }
      }
    }) 
    refsArr.forEach((s) => { observer.observe(s) });
  }, [current]);

  return(
    <section className={styles.section}>
      <h1 className={`text text_type_main-large mb-5 ${styles.title}`}>Соберите бургер</h1>
      <div className={`mb-10 ${styles.container}`}>
        <Tab className='tab' value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab className='tab' value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab className='tab' value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.scroll}>
        <BurgerIngredientCategory ref={bunRef} item={{title:'Булки', type:'bun'}} />
        <BurgerIngredientCategory ref={souceRef} item={{title:'Соусы', type:'sauce'}} />
        <BurgerIngredientCategory ref={mainRef} item={{title:'Начинки', type:'main'}} />
      </div>
    </section>
  );
}

export default BurgerIngredients;