//import dataPropTypes from '../../../utils/prop-types.js';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './app-header-item.module.css';
import PropTypes from 'prop-types';
import { Link, useMatch } from 'react-router-dom';


function AppHeaderItem(props) {
  const { title, to } = props;
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

AppHeaderItem.propTypes = {
  title: PropTypes.string.isRequired
}

export default AppHeaderItem;
