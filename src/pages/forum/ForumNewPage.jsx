import styles from './ForumPage.module.css';

import { useRef } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { t } from '../../i18n/translate';
import RouteNames from '../../router/RouteNames';
import CommunityForm from './community-form/CommunityForm';
import ForumHeader from './forum-header/ForumHeader';

function ForumNewPage() {
  const communityFormRef = useRef(null);

  return (
    <div className={styles.container}>
      <ForumHeader initialSelectedPage={RouteNames.FORUM_NEW} />
      <div className={styles.content}>
        <Container className="container-margin-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="my-4">{t('CREATE_COMMUNITY')}</h3>
            <Button onClick={() => communityFormRef.current.handleSubmit()}>
              {t('CREATE')}
            </Button>
          </div>
          <Card>
            <Card.Header>
              <h5 className="my-2">{t('COMMUNITY')}</h5>
            </Card.Header>
            <Card.Body>
              <CommunityForm ref={communityFormRef} />
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default ForumNewPage;
