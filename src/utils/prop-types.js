import PropTypes from 'prop-types';

const dataPropTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
});

export default dataPropTypes;