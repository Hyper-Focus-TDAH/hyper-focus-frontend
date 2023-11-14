import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { t } from '../../i18n/translate';
import RouteNames from '../../router/RouteNames';
import ChangePasswordForm from '../configurations/ChangePasswordForm';

function PasswordRecoveryPage() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  return (
    <>
      {!isPasswordChanged && (
        <ChangePasswordForm
          showSubmit
          onSubmit={() => setIsPasswordChanged(true)}
          passwordRecoveryToken={token}
          style={{ width: '300px' }}
        />
      )}
      {isPasswordChanged && (
        <Card style={{ width: '300px' }}>
          <Card.Body>
            <Card.Title className="mb-3 text-center">{t('DONE')}</Card.Title>
            <Card.Subtitle className="mb-3 text-center">
              {t('YOUR_PASSWORD_WAS_UPDATED')}
            </Card.Subtitle>
            <Button
              className="mt-1 w-100"
              variant="primary"
              type="button"
              onClick={() => navigate(RouteNames.LOGIN)}
            >
              {t('GO_BACK')}
            </Button>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default PasswordRecoveryPage;
