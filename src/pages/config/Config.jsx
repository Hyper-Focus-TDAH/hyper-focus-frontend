import { useRef } from 'react';

import { Button, Container } from 'react-bootstrap';

import { t } from '../../i18n/translate';
import ChangeLanguage from './ChangeLanguage';
import ChangePassword from './ChangePassword';

function Config() {
  const formRefs = {
    changePassword: useRef(null),
    changeLanguage: useRef(null),
  };

  function submitAllForms() {
    Object.keys(formRefs).forEach((key) =>
      formRefs[key].current.handleSubmit()
    );
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="my-4">{t('CONFIGURATIONS')}</h3>
        <Button onClick={submitAllForms}>{t('SAVE')}</Button>
      </div>
      <ChangePassword className="mb-3" ref={formRefs.changePassword} />
      <ChangeLanguage className="mb-3" ref={formRefs.changeLanguage} />
    </Container>
  );
}

export default Config;
