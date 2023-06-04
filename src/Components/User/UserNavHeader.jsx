import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { userContext } from '../../UserContext';
import { ReactComponent as MyPhotos } from '../../Assets/feed.svg';
import { ReactComponent as Stats } from '../../Assets/estatisticas.svg';
import { ReactComponent as AddPhoto } from '../../Assets/adicionar.svg';
import { ReactComponent as Logout } from '../../Assets/sair.svg';

import styles from './UserNavHeader.module.css';
import useMedia from '../../Hooks/useMedia';

const UserNavHeader = () => {
  const { userLogout } = React.useContext(userContext);
  const navigate = useNavigate();
  const mobile = useMedia('(max-width: 40rem)');
  const [mobileMenu, setMobileMenu] = React.useState(null);
  const { pathname } = useLocation();

  function handleLogout() {
    userLogout();
    navigate('/login');
  }

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <button
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          aria-label="Menu"
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}
      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink to={'/account'} end>
          <MyPhotos />
          {mobile && 'Minhas fotos'}
        </NavLink>
        <NavLink to={'/account/stats'}>
          <Stats />
          {mobile && 'Estatísticas'}
        </NavLink>
        <NavLink to={'/account/post'}>
          <AddPhoto />
          {mobile && 'Adicionar Foto'}
        </NavLink>
        <button onClick={handleLogout}>
          <Logout />
          {mobile && 'Sair'}
        </button>
      </nav>
    </>
  );
};

export default UserNavHeader;
