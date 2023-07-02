import styles from './PostPage.module.css';

import { Card, Container } from 'react-bootstrap';
import { useT } from '../../../i18n/translate';
import ForumSearch from '../ForumSearch';

function PostPage() {
  const t = useT();

  return (
    <div className={styles.container}>
      <ForumSearch />
      <div className={styles.content}>
        <Container className="container-margin-bottom">
          <Card className={styles.post}></Card>
        </Container>
      </div>
    </div>
  );
}

export default PostPage;

export async function loader() {
  return [];
}
