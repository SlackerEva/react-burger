import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import style from './app-header-item.module.css';
import { Link, useMatch } from 'react-router-dom';

type THeaderItemProps = {
  readonly title: string;
  readonly to: string;
  readonly className?: string;
}

const AppHeaderItem: FC<THeaderItemProps> = ({ title, to }) => {
  const match = useMatch(to);
  const active = match ? 'white' : '#8585AD';
  const iconActive = match ? 'primary' : 'secondary';

  return(
    <Link to={to} className={`pl-5 pr-5 pb-4 pt-4 ${style.link}`}>
      {to === '' ? <BurgerIcon type={iconActive} /> : to === 'orders' ? <ListIcon type={iconActive} /> : <ProfileIcon type={iconActive} />}
      <span style={{ color: active }} className={`pl-2 text text_type_main-default`}>{title}</span>
    </Link>
  );
}

export default AppHeaderItem;
