import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import './App.css';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main style={{ display: 'inline-flex', justifyContent: 'space-between', minWidth: 1240 }}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
