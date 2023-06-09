import styles from './Tasks.module.css';

import moment from 'moment';
import { useEffect, useState } from 'react';
import { Button, Card, Form, InputGroup, Nav } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useT } from '../../i18n/translate';
import { auxActions } from '../../store/auxStore';
import TaskEvent from './tasks-calendar/TaskEvent';
import TasksCalendar from './tasks-calendar/TasksCalendar';
import TasksList from './tasks-list/TasksList';
import TasksTable from './tasks-table/TasksTable';
import { TasksViewTypes } from './tasksConfig';

function Tasks() {
  const [taskDesc, setTaskDesc] = useState('');
  const [tasks, setTasks] = useState([] /*tasksLoader*/);
  const t = useT();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { '*': view } = useParams();
  const [activeTab, setActiveTab] = useState(view);

  const location = useLocation();

  useEffect(() => {
    if (['/tasks', '/tasks/', '/tasks/*'].includes(location.pathname)) {
      handleTabSelect(TasksViewTypes.CALENDAR);
    }
  }, [location.pathname]);

  const handleTabSelect = (view) => {
    setActiveTab(view);
    navigate(view);
  };

  function handleTaskTextChange(event) {
    console.log(view);
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
    <div className={styles.container}>
      <InputGroup className="py-3">
        <Form.Control
          value={taskDesc}
          onChange={handleTaskTextChange}
          onKeyDown={handleKeyDown}
          placeholder={t('EXAMPLE_ADD_NOTE')}
        />
        <Button className="d-flex justify-content-center align-items-center">
          <BsPlus style={{ fontSize: '25px' }} />
        </Button>
      </InputGroup>
      <div className={styles.content}>
        <Nav
          variant="tabs"
          defaultActiveKey={TasksViewTypes.CALENDAR}
          className={styles.nav}
          activeKey={activeTab}
          onSelect={handleTabSelect}
        >
          <Nav.Item>
            <Nav.Link eventKey={TasksViewTypes.CALENDAR}>
              {t('CALENDAR')}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={TasksViewTypes.LIST} disabled>
              {t('LIST')}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={TasksViewTypes.TABLE} disabled>
              {t('TABLE')}
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Card className="p-3" style={{ marginTop: '50px' }}>
          {view == TasksViewTypes.CALENDAR && (
            <TasksCalendar
              events={tasks}
              eventContent={TaskEvent}
              dateClick={(data) => console.log(data)}
            />
          )}
          {view == TasksViewTypes.TABLE && <TasksTable />}
          {view == TasksViewTypes.LIST && <TasksList />}
        </Card>
      </div>
    </div>
  );
}

export default Tasks;

export async function loader() {
  return [];
}
