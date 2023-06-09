import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';

import { USER_POST } from '../../api';
import { userContext } from '../../UserContext';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import Head from '../Helper/Head';

const LoginCreate = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm('');

  const { userLogin } = React.useContext(userContext);
  const { loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });

    const { resp } = await request(url, options);

    if (resp.ok) userLogin(username.value, password.value);
  }

  return (
    <section className="animeLeft">
      <Head title="Criar conta" />
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type={'text'}
          label={'Usuário'}
          name={'username'}
          {...username}
        />

        <Input type={'email'} label={'Email'} name={'email'} {...email} />

        <Input
          type={'password'}
          label={'Senha'}
          name={'password'}
          {...password}
        />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;
