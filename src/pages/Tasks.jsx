import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import { useT } from '../i18n/translate';

function Tasks() {
  const [taskText, setTaskText] = useState('');
  const t = useT();

  function handleTaskTextChange(event) {
    setTaskText(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      addNote();
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center m-1 py-3 ">
        <Form.Control
          value={taskText}
          onChange={handleTaskTextChange}
          onKeyDown={handleKeyDown}
          placeholder={t('EXAMPLE_ADD_NOTE')}
        />
        <Button className="d-flex justify-content-center align-items-center ms-2">
          <BsPlus style={{ fontSize: '25px' }} />
        </Button>
      </div>
      <div className="d-flex flex-wrap justify-content-start align-items-start"></div>
    </>
  );
}

export default Tasks;

export async function loader() {
  return [];
}
