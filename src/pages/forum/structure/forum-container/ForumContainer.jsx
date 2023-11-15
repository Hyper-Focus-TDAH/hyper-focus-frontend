import React from 'react';
import { Container } from 'react-bootstrap';
import ForumHeader from '../forum-header/ForumHeader';
import styles from './ForumContainer.module.css';

function ForumContainer({ children }) {
  const forumHeight = 69;

  return (
    <div className={styles.container}>
      <ForumHeader height={forumHeight} />
      <div className={styles.content}>
        <Container className="container-margin-bottom">{children}</Container>
      </div>
    </div>
  );
}

export default ForumContainer;
