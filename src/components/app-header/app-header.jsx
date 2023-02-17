import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderItem from './app-header-item/app-header-item';
import style from './app-header.module.css';

function AppHeader() {
  return(
    <header className={`mr-10 ml-10 ${style.header}`}>
      <nav className={`pt-4 pb-4 mt-10 mb-10 ${style.nav}`}>
        <div>
          <AppHeaderItem icon={<BurgerIcon type="primary" />} styleType="primary" title='Конструктор' />
          <AppHeaderItem className='ml-2' icon={<ListIcon type="secondary" />} title='Лента заказов' />
        </div>
        <Logo />
        <AppHeaderItem icon={<ProfileIcon type="secondary" />} title='Личный кабинет' />
      </nav>
    </header>
  );
}

export default AppHeader;