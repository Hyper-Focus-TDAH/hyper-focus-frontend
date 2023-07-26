import { useRef } from 'react';

import { Button, Container } from 'react-bootstrap';

import { t } from '../../i18n/translate';
import ChangeLanguage from './ChangeLanguage';
import ChangePassword from './ChangePassword';
import ChangeUserInformation from './ChangeUserInformation';

function ConfigurationsPage() {
  const formRefs = {
    changePassword: useRef(null),
    changeLanguage: useRef(null),
    changeUserInfo: useRef(null),
  };

  function submitAllForms() {
    Object.keys(formRefs).forEach((key) => {
      formRefs[key].current.handleSubmit();
    });
  }

  return (
    <Container className="container-margin-bottom">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="my-4">{t('CONFIGURATIONS')}</h3>
        <Button onClick={submitAllForms}>{t('SAVE')}</Button>
      </div>
      <ChangeLanguage className="mb-3" ref={formRefs.changeLanguage} />
      <ChangePassword className="mb-3" ref={formRefs.changePassword} />
      <ChangeUserInformation className="mb-3" ref={formRefs.changeUserInfo} />
    </Container>
  );
}

export default ConfigurationsPage;
