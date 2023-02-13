import { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import style from './App.module.css';

function App() {
  const [ingredients, setIngredients] = useState({
    hasError: false,
    data: []
  });

  const getIngredients = () => {
    setIngredients({ ...ingredients, hasError: false });
    fetch(`${process.env.REACT_APP_BASE_URL}`)
      .then(res => res.json())
      .then(data => setIngredients({ ...ingredients, data }))
      .catch(e => {
        setIngredients({ ...ingredients, hasError: true });
        console.log('Ooops, something goes wrong with fetch query');
      });
  };

  useEffect(() => {
    getIngredients();
  }, []);



  return (
    ingredients.data.data && (
      <div className={style.app}>  
        <AppHeader />
        <main className={style.main}>
          <BurgerIngredients ingredients={ingredients.data.data} />
          <BurgerConstructor ingredients={ingredients.data.data} />
        </main>
      </div>
    )
  );
}

export default App;
