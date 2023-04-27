import ChangePassword from '../components/config/ChangePassword';
import { useSearchParams } from 'react-router-dom';
import { updatePasswordByToken } from '../services/api/user';

function PasswordRecovery() {
  const [searchParams, setSearchParams] = useSearchParams();

  async function handleSubmit(values) {
    const body = {
      token: searchParams.get('token'),
      newPassword: values.newPassword,
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
