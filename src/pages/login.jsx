import { Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from 'react';
import styles from './login.module.css';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchLogin } from "../services/actions/authActions";
import { loggedIn } from '../services/reducers/authSlice.js';
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onChangeEmail = e => {
    setEmail(e.target.value)
  }
  const onChangePass = e => {
    setPassword(e.target.value)
  }

  const login = (event) => {
    event.preventDefault();
    //dispatch(fetchGetUser());
    dispatch(fetchLogin({
      "email": email, 
      "password": password
    }));
    if(getCookie('token')) {
      dispatch(loggedIn());
    }
    navigate('/');
  }

  return (
    <div className={styles.container}>
      <form onSubmit={login}>
        <h1 >Вход</h1>
        <Input extraClass="mb-6" placeholder="E-mail" value={email} name="email" onChange={onChangeEmail} />
        <PasswordInput extraClass="mb-6" placeholder="Пароль" value={password} name="password" onChange={onChangePass} />
        <Button extraClass="mb-20" htmlType="submit" type="primary" size="medium">Войти</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">Вы — новый пользователь? <Link className={styles.link} to={'/register'}>Зарегестрироваться</Link></p>
      <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link className={styles.link} to={'/forgot-password'}>Восстановить пароль</Link></p>
    </div>
  );
}

export default Login;