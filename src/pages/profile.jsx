import { PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './profile.module.css';
import { fetchGetUser, fetchChangeUserData } from "../services/actions/authActions";
import { logout } from '../services/reducers/authSlice.js';
import { Link } from 'react-router-dom';

function Profile() {
  
  const dispatch = useDispatch();
  const storeName = useSelector((state) => state.auth.userName);
  const storeEmail = useSelector((state) => state.auth.email);
  const [name, setName] = useState(storeName);
  const [email, setEmail] = useState(storeEmail);
  const [pass, setPass] = useState("");

  const onChangeName = e => {
    setName(e.target.value)
  }

  const onChangeEmail = e => {
    setEmail(e.target.value)
  }

  const handleLogout = () => {
    dispatch(logout());
  }

  const handleSave= (event) => {
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
  }, );

  return (
    <div className={styles.container}>
      <ul className={`${styles.ul}`}>
        <li className={`text text_type_main-medium ${styles.li}`}>Профиль</li>
        <li className={`text text_type_main-medium text_color_inactive ${styles.li}`}>История заказов</li>
        <Link className={`text text_type_main-medium text_color_inactive mb-20 ${styles.li}`} onClick={handleLogout} to={'/login'}>Выход</Link>
        <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
      </ul>
      <form onSubmit={handleSave}>
        <Input extraClass="mb-6" placeholder="Имя" icon={'EditIcon'} value={name} name="name" onChange={onChangeName} />
        <Input extraClass="mb-6" placeholder="Логин" icon={'EditIcon'} value={email} name="email" onChange={onChangeEmail} />
        <PasswordInput extraClass="mb-6" placeholder="Пароль" icon={'EditIcon'} value={pass} name="pass" onChange={(e) => setPass(e.target.value)} />
        <Button htmlType="submit" type="primary" size="small" extraClass="ml-2">
          Сохранить
        </Button>
        <Button htmlType="button" type="primary" size="small" extraClass="ml-2" onClick={handleCancel}>
          Отмена
        </Button>
      </form>
    </div>
  );
}

export default Profile;