import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data.js';
import BurgerConstructorRow from './burger-constructor-row/burger-constructor-row.jsx';
import styles from './burger-constructor.module.css';

function BurgerConstructor() {
  return (
    <section  style={{ maxWidth: 600 }}>
      <div style={{ display: 'flex', flexDirection: 'column'}} className='mt-15 ml-4'>
        <ConstructorElement
          extraClass="ml-8 mb-4"
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={data[0].image}
        />
        <ul style={{ padding: 0, margin: 0 }}className={styles.scroll}>
          {
            data.filter(obj => obj.type !== 'bun').map(item => (
              <BurgerConstructorRow key={item._id}  item={item} />
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
      <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="mt-10">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className='mr-10'>
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