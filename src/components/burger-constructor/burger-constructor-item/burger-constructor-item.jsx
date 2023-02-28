import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
//import dataPropTypes from '../../../utils/prop-types.js';
import PropTypes from 'prop-types';
import style from './burger-constructor-item.module.css';
import { removeIngredientData } from '../../../services/reducers/reducers.js';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';

function BurgerConstructorItem(props) {
  const { index, moveCard } = props;
  const { dragId, item } = props.item;
  const { name, price, image, type } = item;

  const dispatch = useDispatch();

  function removeIngredient() {
    dispatch(removeIngredientData(dragId));
  }

  const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
      accept: 'component',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId()
        }
      },
      hover(item, monitor) {
        if (!ref.current) {
            return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
            return;
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        moveCard(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    })

    const [{ isDragging }, drag] = useDrag({
      type: 'component',
      item: () => ({id: dragId, index}),
      collect: (monitor) => ({
          isDragging: monitor.isDragging(),
      }),
    });
    const opacity = isDragging ? 0 : 1;
    if (type !== 'bun') drag(drop(ref));
    const preventDefault = (e) => e.preventDefault();

  return (
    <li className={`mb-4 mr-1 ${style.li}`}
      ref={ref}
      style={{ opacity }}
      onDrop={preventDefault}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={removeIngredient}
      />
    </li>
  )
}

BurgerConstructorItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default BurgerConstructorItem;