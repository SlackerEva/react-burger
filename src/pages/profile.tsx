import { PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from 'react';
import styles from './profile.module.css';
import { fetchGetUser, fetchChangeUserData } from "../services/actions/authActions";
import { logout } from '../services/reducers/authSlice';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from "../utils/hooks";
import { TOrderData } from "../types/types";
import OrdersItem from "../components/orders/orders-item/orders-item";
import { getCookie } from "../utils/cookie";
import { connect } from '../services/actions/ws-orders-action';

function Profile() {
  const dispatch = useAppDispatch();
  const storeName = useAppSelector((state) => state.auth.userName);
  const storeEmail = useAppSelector((state) => state.auth.email);
  const { orders } = useAppSelector((store) => store.orders);
  const [name, setName] = useState(storeName);
  const [email, setEmail] = useState(storeEmail);
  const [pass, setPass] = useState("");
  const location = useLocation();
  const accessToken = getCookie("token");

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleLogout = () => {
    dispatch(logout());
  }

  const handleSave= (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(fetchChangeUserData({
      "name": name,
      "email": email, 
      "password": pass
    }));
  }

  const handleCancel= () => {
    setName(storeName);
    setEmail(storeEmail);
    setPass('');
  }

  useEffect(() => {
    dispatch(fetchGetUser());
    if (accessToken) {
      let token = accessToken.split(" ");
      dispatch(connect(`wss://norma.nomoreparties.space/orders?token=${token[1]}`));
    }
  }, [dispatch, accessToken]);

  const activeProfile = location.pathname === "/profile" ? 'white' : '#8585AD';
  const activeOrders = location.pathname === "/profile/orders" ? 'white' : '#8585AD';

  return (
    <div className={styles.container}>
      <div className={`${styles.nav}`}>
        <Link style={{ color: activeProfile }} className={`text text_type_main-medium ${styles.li}`} to={'/profile'}>Профиль</Link>
        <Link style={{ color: activeOrders }} className={`text text_type_main-medium ${styles.li}`} to={'/profile/orders'}>История заказов</Link>
        <Link className={`text text_type_main-medium text_color_inactive mb-20 ${styles.li} `} onClick={handleLogout} to={'/login'}>Выход</Link>
        <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      {location.pathname === "/profile/orders" ? 
      (<section className={styles.section}>
        {
          (<div className={styles.scroll}>
            {orders?.map((item: TOrderData) => (
              <OrdersItem key={item._id} item={item}/>
            ))}
          </div>)
        }
      </section>)
      : 
      (<form onSubmit={handleSave}>
        <Input extraClass="mb-6" placeholder="Имя" icon={'EditIcon'} value={name} name="name" onChange={onChangeName} />
        <Input extraClass="mb-6" placeholder="Логин" icon={'EditIcon'} value={email} name="email" onChange={onChangeEmail} />
        <PasswordInput extraClass="mb-6" placeholder="Пароль" icon={'EditIcon'} value={pass} name="pass" onChange={(e) => setPass(e.target.value)} />
        <Button htmlType="submit" type="primary" size="small" extraClass="ml-2">
          Сохранить
        </Button>
        <Button htmlType="button" type="primary" size="small" extraClass="ml-2" onClick={handleCancel}>
          Отмена
        </Button>
      </form>)}
    </div>
  );
}

export default Profile;

/*


(status === WebSocketStatus.OFFLINE || status === WebSocketStatus.ERROR) ? 
            (<p className={`text text_type_main-medium `}>Кажется что-то пошло не так</p>) : 
            (<p className={`text text_type_main-medium `}>Сделайте заказ</p>)   


        {status === WebSocketStatus.ONLINE ? 
          (<div className={styles.scroll}>
            {orders?.map((item: TOrderData) => (
              <OrdersItem key={item._id} item={item}/>
            ))}
          </div>) : (<p className={`text text_type_main-medium `}>Кажется что-то пошло не так</p>)
        }
*/