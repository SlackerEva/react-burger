//import dataPropTypes from '../../../utils/prop-types.js';
import style from './app-header-item.module.css';
import PropTypes from 'prop-types';

function AppHeaderItem(props) {
  const { icon, title, styleType } = props;
  return(
    <a className={`pl-5 pr-5 pb-4 pt-4 ${style.link}`} href="#">
      {icon}
      <span className={`pl-2 text text_type_main-default ${styleType === 'primary' ? style.primary : style.secondary}`}>{title}</span>
    </a>
  );
}

AppHeaderItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  styleType: PropTypes.oneOf(["primary"]),
  // icon: dataPropTypes.isRequired,
  // title: dataPropTypes.isRequired,
  // styleType: dataPropTypes
}

export default AppHeaderItem;