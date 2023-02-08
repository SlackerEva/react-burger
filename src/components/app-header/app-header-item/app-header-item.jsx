import dataPropTypes from '../../../utils/prop-types.js';
import style from './app-header-item.module.css';

function AppHeaderItem(props) {
  const { icon, title, type } = props;
  return(
    <a className={`pl-5 pr-5 pb-4 pt-4 ${style.link}`} href="#">
      {icon}
      <p className={`pl-2 text text_type_main-default ${type === 'primary' ? style.primary : style.secondary}`}>{title}</p>
    </a>
  );
}

AppHeaderItem.propTypes = {
  icon: dataPropTypes,
  title: dataPropTypes,
}

export default AppHeaderItem;