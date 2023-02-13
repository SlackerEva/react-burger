import CheckMarkIcon from '../../../images/done.svg';

function OrderDetails() {
  return (
    <>
      <h2 className={`text text_type_digits-large mt-30 mb-8`}>034536</h2>
      <p className="text text_type_main-large">идентификатор заказа</p>
      <img className="mt-15 mb-15" src={CheckMarkIcon} alt='done'/>
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default mt-2 mb-30">Дождитесь готовности на орбитальной станции</p>
    </>
  );
} 

export default OrderDetails;