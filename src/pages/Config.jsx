import { useRef } from 'react';

import { Container, Button } from 'react-bootstrap';

import { t } from '../i18n/translate';
import ChangePassword from '../components/config/ChangePassword';

function Config() {

  const formRefs = {
    changePassword: useRef(null),
  }

  function submitAllForms () {
    // Object.keys(formRefs).forEach(key => formRefs[key].submit())
  }

  return (
    <Container>
      <div className='d-flex justify-content-between align-items-center'>
        <h3 className="my-4">{t('CONFIGURATIONS')}</h3>
        <Button onClick={submitAllForms}>{t('SAVE')}</Button>
      </div>
      <ChangePassword ref={formRefs.changePassword} />
    </Container>
  );
}

export default Config;
