import styles from './Forum.module.css';

import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useT } from '../../i18n/translate';
import ForumActions from './ForumActions';
import ForumCreatePost from './ForumCreatePost';
import ForumSearch from './ForumSearch';
import ForumPosts from './posts/ForumPosts';

function Forum() {
  const t = useT();

  const [posts, setPosts] = useState(
    new Array(40).fill({
      forum: 'f/nomeDoForum',
      user: 'u/nomeDoUser',
      date: '1999-09-07',
      title: 'Titulo teste do post',
      description: 'Descricao teste do post post post post post post post ',
      tags: ['tag1', 'tag2', 'tag3'],
      upvotes: 30,
      downvotes: 5,
      isSaved: false,
    })
  );

  return (
    <div className={styles.container}>
      <ForumSearch />
      <div className={styles.content}>
        <Container className="container-margin-bottom">
          <ForumCreatePost />
          <ForumActions />
          <ForumPosts posts={posts} />
        </Container>
      </div>
    </div>
  );
}

export default Forum;

export async function loader() {
  return [];
}
