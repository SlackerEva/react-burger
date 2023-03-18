import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from 'react';
import styles from './login.module.css';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchResetPass } from "../../services/actions/authActions";


function ResetPass() {
  const dispatch = useDispatch();

  const [pass, setPass] = useState('');
  const [token, setToken] = useState('');
  const onChangePass = e => {
    setPass(e.target.value)
  }

  const onChangeToken = e => {
    setToken(e.target.value)
  }

  const reset = () => {
    dispatch(fetchResetPass({
      "password": pass,
      "token": token, 
    }));
  }

  return (
    <div className={styles.container}>
      <form>
        <h1 >Восстановление пароля</h1>
        <PasswordInput extraClass="mb-6" placeholder="Введите новый пароль" value={pass} name="password" onChange={onChangePass} />
        <Input extraClass="mb-6" placeholder="Введите код из письма" value={token} name="email" onChange={onChangeToken} />
        <Button onClick={reset} extraClass="mb-20" htmlType="button" type="primary" size="medium">Сохранить</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">Вспомнили пароль? <Link className={styles.link} to={'/login'}>Войти</Link></p>
    </div>
  );
}

export default ResetPass;