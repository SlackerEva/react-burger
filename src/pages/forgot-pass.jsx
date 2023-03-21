import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from 'react';
import styles from './login.module.css';
import { Link, Navigate, useLocation } from "react-router-dom";
import { fetchForgotPass } from "../services/actions/authActions";
import { useSelector, useDispatch } from 'react-redux';

function ForgotPass() {
  const [value, setValue] = useState('');
  const location = useLocation();
  const resetPass = useSelector((state) => state.auth.resetPass);
  const dispatch = useDispatch();
  const onChange = e => {
    setValue(e.target.value)
  }

  const reset = (event) => {
    event.preventDefault();
    dispatch(fetchForgotPass(value));
  }

  if (resetPass) {
    return (<Navigate to="/reset-password" state={{ from: location }} replace />);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={reset}>
        <h1 >Восстановление пароля</h1>
        <Input extraClass="mb-6" placeholder="Укажите e-mail" value={value} name="email" onChange={onChange} />
        <Button  extraClass="mb-20" htmlType="submit" type="primary" size="medium">Восстановить</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">Вспомнили пароль? <Link className={styles.link} to={'/login'}>Войти</Link></p>
    </div>
  );
}

export default ForgotPass;