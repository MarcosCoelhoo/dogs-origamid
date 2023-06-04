import React from 'react';
import Image from '../Helper/Image';

import styles from './FeedPhotoItem.module.css';

const FeedPhotoItem = ({ photo, setModalPhoto }) => {
  function handleClick() {
    setModalPhoto(photo);
  }

  return (
    <li onClick={handleClick} className={styles.photo}>
      <Image src={photo.src} alt={photo.title} />
      <span className={styles.view}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotoItem;
