import moment from 'moment';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import Calendar from '../components/core/Calendar';
import TaskEvent from '../components/tasks/TaskEvent';
import { useT } from '../i18n/translate';
import { auxActions } from '../store/aux';

function Tasks() {
  const [taskDesc, setTaskDesc] = useState('');
  const [tasks, setTasks] = useState([] /*tasksLoader*/);
  const t = useT();
  const dispatch = useDispatch();

  function handleTaskTextChange(event) {
    setTaskDesc(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  }

  async function addTask() {
    if (taskDesc.length === 0) {
      return;
    }

    try {
      dispatch(auxActions.setLoading(true));

      // TODO save task
      const newTask = {
        id: Math.random(),
        title: taskDesc,
        done: false,
        date: moment().format('YYYY-MM-DD'),
      };

      console.log(newTask);

      setTasks((oldTasks) => {
        const newTasks = [newTask, ...oldTasks];
        return newTasks;
      });

      setTaskDesc('');
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(auxActions.setLoading(false));
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center m-1 py-3 ">
        <Form.Control
          value={taskDesc}
          onChange={handleTaskTextChange}
          onKeyDown={handleKeyDown}
          placeholder={t('EXAMPLE_ADD_NOTE')}
        />
        <Button className="d-flex justify-content-center align-items-center ms-2">
          <BsPlus style={{ fontSize: '25px' }} />
        </Button>
      </div>
      <Calendar
        events={tasks}
        eventContent={TaskEvent}
        dateClick={(data) => console.log(data)}
      />
    </>
  );
}

export default Tasks;

export async function loader() {
  return [];
}
