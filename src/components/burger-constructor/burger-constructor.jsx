import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data.js';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item.jsx';
import styles from './burger-constructor.module.css';

function BurgerConstructor() {
  const type = data.filter(obj => obj.type !== 'bun');
  return (
    <section className={styles.section}>
      <div className={`mt-15 ml-4 ${styles.container}`}>
        <ConstructorElement
          extraClass="ml-8 mb-4"
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={data[0].image}
        />
        <ul className={styles.scroll}>
          {
            type.map(item => (
              <BurgerConstructorItem key={item._id}  item={item} />
            ))
          }
        </ul>
        <ConstructorElement
          extraClass="ml-8"
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={data[0].image}
        />
      </div>
      <div className={`mt-10 ${styles.orderbox}`}>
        <div className={`mr-10 ${styles.summ}`}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;