import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderItem from './app-header-item/app-header-item';
import style from './app-header.module.css';
import { Link } from 'react-router-dom';


function AppHeader() {
  return(
    <header className={`mr-10 ml-10 ${style.header}`}>
      <nav className={`pt-4 pb-4 mt-10 mb-10 ${style.nav}`}>
        <div>
            <AppHeaderItem to='' title='Конструктор' />
            <AppHeaderItem to='orders' className='ml-2' title='Лента заказов' />
        </div>
        <Link to={'/'} >
          <Logo />
        </Link>
        <AppHeaderItem to='profile' title='Личный кабинет' />
      </nav>
    </header>
  );
}

export default AppHeader;