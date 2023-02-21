import { useState, useEffect } from 'react';
import { IngredientsContext } from '../../utils/ingredientsContext.js';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import style from './App.module.css';
import { getIngredients } from '../../utils/burger-api.js';

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients()
      .then((data) => {
        setIngredients(data)
      })
      .catch('При загрузке произошла ошибка');
  }, []);


  return (
    ingredients.data && (
      <div className={style.app}>  
        <AppHeader />
        <main className={style.main}>
          <BurgerIngredients ingredients={ingredients.data} />
          <IngredientsContext.Provider value={ingredients.data}>
            <BurgerConstructor />
          </IngredientsContext.Provider>
        </main>
      </div>
    )
  );
}

export default App;
