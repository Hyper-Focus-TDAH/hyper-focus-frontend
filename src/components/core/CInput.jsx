import { Form } from 'react-bootstrap';

import { useT } from '../../i18n/translate';

function CInput({id, type, intlKey, onChange, onBlur, value, isInvalid}) {

  const t = useT();

  return (
    <Form.Group className="position-relative mb-4">
      <Form.Control
        id={id}
        name={id}
        type={type}
        placeholder={t(intlKey)}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        isInvalid={isInvalid}
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

export default CInput;
