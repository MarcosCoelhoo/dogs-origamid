import React from 'react';
import UserNavHeader from './UserNavHeader';

import styles from './UserHeader.module.css';
import { useLocation } from 'react-router-dom';

const UserHeader = () => {
  const [title, setTitle] = React.useState('null');
  const location = useLocation().pathname.split('/');
  const titleLocation = location[location.length - 1];

  React.useEffect(() => {
    switch (titleLocation) {
      case 'post':
        setTitle('Poste sua foto');
        break;
      case 'stats':
        setTitle('Estatísticas');
        break;
      default:
        setTitle('Minha Conta');
    }
  }, [titleLocation]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserNavHeader />
    </header>
  );
};

export default UserHeader;
