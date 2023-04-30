import { useEffect, useState, useRef  } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientCategory from './burger-ingredients-category/burger-ingredients-category';
import styles from './burger-ingredients.module.css';
import { FC } from 'react';

const BurgerIngredients: FC = () => {
  const [current, setCurrent] = useState('bun');
  const bunRef = useRef<null | HTMLDivElement>(null);
  const souceRef = useRef<null | HTMLDivElement>(null);
  const mainRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    const refsArr = [bunRef.current, souceRef.current, mainRef.current];
    const sections: any = {};
    let observer = new IntersectionObserver((entrys) => {
      for (const entry of entrys) {
        sections[entry.target.id ] = entry.isIntersecting;
      }
      for (const section in sections) {
        if (sections[section]) {
          setCurrent(section);
          break;
        }
      }
    }) 
    refsArr.forEach((s: any) => { observer.observe(s) });
  }, [current]);

  return(
    <section className={styles.section}>
      <h1 className={`text text_type_main-large mb-5 ${styles.title}`}>Соберите бургер</h1>
      <div className={`mb-10 ${styles.container}`}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.scroll}>
        <BurgerIngredientCategory ref={bunRef} title={'Булки'} type={'bun'} />
        <BurgerIngredientCategory ref={souceRef} title={'Соусы'} type={'sauce'} />
        <BurgerIngredientCategory ref={mainRef} title={'Начинки'} type={'main'} />
      </div>
    </section>
  );
}//className='tab'

export default BurgerIngredients;