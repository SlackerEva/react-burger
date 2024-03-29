import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from 'react';
import styles from './login.module.css';
import { Link } from "react-router-dom";
import { useAppDispatch } from "../utils/hooks";
import { fetchResetPass } from "../services/actions/authActions";
import { useLocation, Navigate } from "react-router-dom";


function ResetPass() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [pass, setPass] = useState('');
  const [token, setToken] = useState('');

  if (from.pathname !== '/forgot-password') {
    return (
      <Navigate to={'/'} />
    );
  }

  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value)
  }

  const onChangeToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value)
  }

  const reset = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(fetchResetPass({
      "password": pass,
      "token": token, 
    }));
  }

  return (
    <div className={styles.container}>
      <form onSubmit={reset}>
        <h1 >Восстановление пароля</h1>
        <PasswordInput extraClass="mb-6" placeholder="Введите новый пароль" value={pass} name="password" onChange={onChangePass} />
        <Input extraClass="mb-6" placeholder="Введите код из письма" value={token} name="email" onChange={onChangeToken} />
        <Button extraClass="mb-20" htmlType="submit" type="primary" size="medium">Сохранить</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">Вспомнили пароль? <Link className={styles.link} to={'/login'}>Войти</Link></p>
    </div>
  );
}

export default ResetPass;