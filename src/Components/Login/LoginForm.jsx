import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { userContext } from '../../UserContext';
import Error from '../Helper/Error';

import styles from './LoginForm.module.css';
import stylesBtn from '../Forms/Button.module.css';
import Head from '../Helper/Head';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const { userLogin, error, loading } = React.useContext(userContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Login" />

      <h1 className="title">Login</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label={'Usuário'} type="text" name="username" {...username} />
        <Input label={'Senha'} type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}

        <Error error={error && 'Dados Incorretos.'} />
      </form>
      <Link to={'/login/lost'} className={styles.lost}>
        Perdeu a senha?
      </Link>

      <div className={styles.subscribe}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui uma conta? cadastre-se no site.</p>
        <Link className={stylesBtn.button} to={'/login/create'}>
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
