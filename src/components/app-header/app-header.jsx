import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderItem from './app-header-item/app-header-item';

function AppHeader() {
  return(
    <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='mr-10 ml-10'>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: 1280 }} 
           className='pt-4 pb-4 mt-10 mb-10'
      >
        <div>
          <AppHeaderItem icon={<BurgerIcon type="primary" />} title='Конструктор' />
          <AppHeaderItem className='ml-2' icon={<ListIcon type="primary" />} title='Лента заказов' />
        </div>
        <Logo />
        <AppHeaderItem icon={<ProfileIcon type="primary" />} title='Личный кабинет' />
      </nav>
    </header>
  );
}

export default AppHeader;