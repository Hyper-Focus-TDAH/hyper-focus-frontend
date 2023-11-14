import { Form, InputGroup } from 'react-bootstrap';

import { useT } from '../../i18n/translate';

function TextField({
  id,
  type,
  placeholder,
  intlKey,
  onChange,
  onBlur,
  value,
  isInvalid,
  label,
  disabled,
  as,
  accept,
  append,
  className = 'mb-4',
}) {
  const t = useT();

  return (
    <Form.Group className={`position-relative ${className}`}>
      <InputGroup>
        {append && <InputGroup.Text>{append}</InputGroup.Text>}
        <Form.Control
          id={id}
          name={id}
          type={type}
          placeholder={placeholder ?? t(intlKey)}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          accept={accept}
          isInvalid={isInvalid}
          disabled={disabled}
          as={as}
        />
        <Form.Control.Feedback
          style={{ display: 'flex', margin: '0' }}
          type="invalid"
        >
          {isInvalid}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
}

export default TextField;
