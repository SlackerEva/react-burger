import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from 'react';
import styles from './login.module.css';
import { Link, Navigate } from "react-router-dom";
import { fetchForgotPass } from "../../services/actions/authActions";
import { useSelector, useDispatch } from 'react-redux';

function ForgotPass() {
  const [value, setValue] = useState('');
  const resetPass = useSelector((state) => state.auth.resetPass);
  const dispatch = useDispatch();
  const onChange = e => {
    setValue(e.target.value)
  }

  const reset = () => {
    dispatch(fetchForgotPass(value));
  }

  return (
    resetPass === false ?
    (
      <div className={styles.container}>
        <form>
          <h1 >Восстановление пароля</h1>
          <Input extraClass="mb-6" placeholder="Укажите e-mail" value={value} name="email" onChange={onChange} />
          <Button onClick={reset} extraClass="mb-20" htmlType="button" type="primary" size="medium">Восстановить</Button>
        </form>
        <p className="text text_type_main-default text_color_inactive mb-4">Вспомнили пароль? <Link className={styles.link} to={'/login'}>Войти</Link></p>
      </div>
    ) : (<Navigate to="/reset-password" />)
 
  );
}

export default ForgotPass;