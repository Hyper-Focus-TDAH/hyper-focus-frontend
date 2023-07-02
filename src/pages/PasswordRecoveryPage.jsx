import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { t } from '../i18n/translate';
import RouteNames from '../router/RouteNames';
import { updatePasswordByToken } from '../services/api/usersApi';
import { auxActions } from '../store/auxStore';
import ChangePassword from './configurations/ChangePassword';

function PasswordRecoveryPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  async function handleSubmit(values) {
    const body = {
      password: values.newPassword,
      passwordRecoveryToken: searchParams.get('token'),
    };

    try {
      dispatch(auxActions.setLoading(true));

      await updatePasswordByToken(body);

      setIsPasswordChanged(true);
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(auxActions.setLoading(false));
    }
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

export default PasswordRecoveryPage;
