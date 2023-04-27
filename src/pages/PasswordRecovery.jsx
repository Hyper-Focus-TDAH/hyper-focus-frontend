import ChangePassword from '../components/config/ChangePassword';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { updatePasswordByToken } from '../services/api/user';
import { useState } from 'react';
import { t } from '../i18n/translate';
import { Button, Card } from 'react-bootstrap';
import RouteNames from '../router/RouteNames';

function PasswordRecovery() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  async function handleSubmit(values) {
    const body = {
      password: values.newPassword,
      passwordRecoveryToken: searchParams.get('token'),
    };

    await updatePasswordByToken(body);

    setIsPasswordChanged(true);
  }

  return (
    <>
      {!isPasswordChanged && (
        <ChangePassword showSubmit onSubmit={handleSubmit} />
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

export default PasswordRecovery;
