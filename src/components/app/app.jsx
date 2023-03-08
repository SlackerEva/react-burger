import { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import style from './app.module.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/actions/actions';


function App() {
  const dispatch = useDispatch();

  useEffect (() => {
    dispatch(fetchIngredients());
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
