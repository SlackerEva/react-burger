import { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import style from './App.module.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import { getAllIngredients } from '../../services/reducers/reducers.js';
import { getIngredients } from '../../utils/burger-api.js';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getIngredients()
      .then((data) => {
        dispatch(getAllIngredients(data.data));
      })
      .catch('При загрузке произошла ошибка');
  }, [dispatch]);


  return (
    <div className={style.app}>  
      <AppHeader />
      <main className={style.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
}

export default App;

//<BurgerIngredients />
/*
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
 */