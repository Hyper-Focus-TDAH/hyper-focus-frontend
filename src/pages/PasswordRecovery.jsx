import ChangePassword from '../components/config/ChangePassword';
import { useSearchParams } from 'react-router-dom';
import { updatePasswordByToken } from '../services/api/user';

function PasswordRecovery() {
  const [searchParams, setSearchParams] = useSearchParams();

  async function handleSubmit(values) {
    const body = {
      password: values.newPassword,
      passwordRecoveryToken: searchParams.get('token'),
    }

    await updatePasswordByToken(body)
  }

  return (
    <>
      <ChangePassword showSubmit onSubmit={handleSubmit} />
    </>
  );
}

export default PasswordRecovery;
