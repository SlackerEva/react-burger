import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import style from './burger-constructor-item.module.css';
import { removeIngredientData } from '../../../services/reducers/reducers';
import { useAppDispatch } from '../../../utils/hooks';
import { useRef } from 'react';
import {DropTargetMonitor, useDrop, useDrag } from 'react-dnd';

type TBCItemProps = {
  index: number;
  item: any;
  moveCard: any;
}

type TDropItem = {
  index: number;
};

const BurgerConstructorItem: FC<TBCItemProps> = (props) => {
  const { index, moveCard } = props;
  const { dragId, item } = props.item;
  const { name, price, image, type} = item;
  const dispatch = useAppDispatch();
  function removeIngredient() {
    dispatch(removeIngredientData(dragId));
  }

  const ref = useRef<null | HTMLLIElement>(null);
    const [{ handlerId }, drop] = useDrop<TDropItem, void, any>({
      accept: 'component',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId()
        }
      },
      hover(item: TDropItem, monitor: DropTargetMonitor) {
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
        if (clientOffset === null) return;
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
    const preventDefault: (e:any)=>void = (e: React.ChangeEvent<HTMLInputElement>) => e.preventDefault();

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

export default BurgerConstructorItem;