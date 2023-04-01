import { Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from 'react';
import styles from './login.module.css';
import { Link } from "react-router-dom";
//import { useForm } from "../hooks/useForm";
import { useAppDispatch } from "../utils/hooks";
import { fetchRegister } from "../services/actions/authActions";

function Register() {
  const dispatch = useAppDispatch();
  // const { values, handleChange } = useForm({
  //   email: "",
  //   userName: "",
  //   password: "",
  // });

  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  
  const register = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(fetchRegister({
      email: email,
      name: userName,
      password: password,
    }));
  }

  return (
    <div className={styles.container}>
      <form onSubmit={register}>
        <h1 >Регистрация</h1>
        <Input extraClass="mb-6" placeholder="Имя" value={userName} name="name" onChange={onChangeName} />
        <Input extraClass="mb-6" placeholder="E-mail" value={email} name="email" onChange={onChangeEmail} />
        <PasswordInput extraClass="mb-6" placeholder="Пароль" value={password} name="password" onChange={onChangePass} />
        <Button extraClass="mb-20" htmlType="submit" type="primary" size="medium">Зарегестрироваться</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">Уже зарегестрированы? <Link className={styles.link} to={'/login'}>Войти</Link></p>
    </div>
  );
}

export default Register;