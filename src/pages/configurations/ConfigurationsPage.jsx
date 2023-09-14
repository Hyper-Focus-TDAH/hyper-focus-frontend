import { useRef } from 'react';

import { Button, Container } from 'react-bootstrap';

import { t } from '../../i18n/translate';
import ChangeLanguageForm from './ChangeLanguageForm';
import ChangePasswordForm from './ChangePasswordForm';
import ChangeUserInformationForm from './ChangeUserInformationForm';

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
      <ChangeLanguageForm className="mb-3" ref={formRefs.changeLanguage} />
      <ChangePasswordForm className="mb-3" ref={formRefs.changePassword} />
      <ChangeUserInformationForm
        className="mb-3"
        ref={formRefs.changeUserInfo}
      />
    </Container>
  );
}

export default ConfigurationsPage;
