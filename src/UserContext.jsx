import React from 'react';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';
import { useNavigate } from 'react-router-dom';

export const userContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const json = await (await fetch(url, options)).json();
    setData(json);
    setLogin(true);
  }

  const userLogout = React.useCallback(async function () {
    setData(null);
    setError(null);
    setLoading(null);
    setLogin(false);
    window.localStorage.removeItem('token');
  }, []);

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const resp = await fetch(url, options);
      if (!resp.ok) throw new Error(`Erro: ${resp.statusText}`);
      const { token } = await resp.json();
      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/account');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');

      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const resp = await fetch(url, options);
          if (!resp.ok) throw new Error('Token invalido');
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <userContext.Provider
      value={{ userLogin, data, userLogout, login, error, loading }}
    >
      {children}
    </userContext.Provider>
  );
};
