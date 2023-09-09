import { useRef } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { t } from '../../i18n/translate';
import RouteNames from '../../router/RouteNames';
import CommunityForm from './community-form/CommunityForm';
import ForumContainer from './structure/ForumContainer';

function ForumNewPage() {
  const communityFormRef = useRef(null);
  const navigate = useNavigate();

  function handleCreateCommunity() {
    communityFormRef.current.handleSubmit();
  }

  return (
    <ForumContainer initialSelectedPage={RouteNames.FORUM_NEW}>
      <Container className="container-margin-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="my-4">{t('CREATE_COMMUNITY')}</h3>
          <Button onClick={handleCreateCommunity}>{t('CREATE')}</Button>
        </div>
        <Card>
          <Card.Header>
            <h5 className="my-2">{t('COMMUNITY')}</h5>
          </Card.Header>
          <Card.Body>
            <CommunityForm
              ref={communityFormRef}
              onSubmit={(response) =>
                navigate(`${RouteNames.FORUM}/${response.data.name}`)
              }
            />
          </Card.Body>
        </Card>
      </Container>
    </ForumContainer>
  );
}

export default ForumNewPage;
