import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';

function QuickCreateInput({
  value,
  onChange,
  onClick,
  onEnterPress,
  placeholder,
  className,
  disabled = false,
}) {
  function handleKeyDown(event) {
    if (event.key === 'Enter' && !disabled && onEnterPress) {
      onEnterPress();
    }
  }

  return (
    <InputGroup className={`${className} py-3`}>
      <Form.Control
        disabled={disabled}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      <Button
        className="d-flex justify-content-center align-items-center"
        disabled={disabled}
        onClick={onClick}
      >
        <BsPlus style={{ fontSize: '25px' }} />
      </Button>
    </InputGroup>
  );
}

export default QuickCreateInput;
