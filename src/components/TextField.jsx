import { Form } from 'react-bootstrap';

import { useT } from '../i18n/translate';

function TextField({
  id,
  type,
  intlKey,
  onChange,
  onBlur,
  value,
  isInvalid,
  label,
  disabled,
  as,
}) {
  const t = useT();

  return (
    <Form.Group className="position-relative mb-4">
      {label && <Form.Label column>{label}</Form.Label>}
      <Form.Control
        id={id}
        name={id}
        type={type}
        placeholder={t(intlKey)}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        isInvalid={isInvalid}
        disabled={disabled}
        as={as}
      />
      <Form.Control.Feedback
        style={{ position: 'absolute', margin: '0' }}
        type="invalid"
      >
        {isInvalid}
      </Form.Control.Feedback>
    </Form.Group>
  );
}

export default TextField;
