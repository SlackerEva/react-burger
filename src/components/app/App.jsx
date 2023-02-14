import { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import style from './App.module.css';
import getIngredients from '../../utils/burger-api.js';

function App() {
  const [ingredients, setIngredients] = useState([]);



  useEffect(() => {
    getIngredients(setIngredients);
  }, [setIngredients]);


  return (
    ingredients.data && (
      <div className={style.app}>  
        <AppHeader />
        <main className={style.main}>
          <BurgerIngredients ingredients={ingredients.data} />
          <BurgerConstructor ingredients={ingredients.data} />
        </main>
      </div>
    )
  );
}

export default App;
