import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';

function useT() {
  const intl = useIntl();
  const t = (id, values) => {
    return intl.formatMessage({ id }, values);
  }
  return t;
}

function t (id, values) {
  return <FormattedMessage id={id} values={{ ...values }} />;
}

export {
  t, useT
};
