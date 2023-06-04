import React from 'react';
import { userContext } from '../../UserContext';
import PhotoCommentsForm from './PhotoCommentsForm';

import styles from './PhotoComments.module.css';

const PhotoComments = (props) => {
  const [comments, setComments] = React.useState(() => props.comments);
  const { login } = React.useContext(userContext);
  const commentsRef = React.useRef(null);

  React.useEffect(() => {
    commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
  }, [comments]);

  return (
    <>
      <ul
        ref={commentsRef}
        className={`${styles.comments} ${props.single ? styles.single : ''}`}
      >
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && (
        <PhotoCommentsForm
          single={props.single}
          id={props.id}
          setComments={setComments}
        />
      )}
    </>
  );
};

export default PhotoComments;
