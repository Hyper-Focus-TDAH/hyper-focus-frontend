import styles from './Tasks.module.css';

import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Button, Card, Form, InputGroup, Nav } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useT } from '../../i18n/translate';
import { auxActions } from '../../store/auxStore';
import TaskEvent from './tasks-calendar/TaskEvent';
import TasksCalendar from './tasks-calendar/TasksCalendar';
import TasksList from './tasks-list/TasksList';
import TasksTable from './tasks-table/TasksTable';
import { TasksViewTypes, formatBackendDateForCalendar } from './tasksConfig';

import Dialog from '../../components/Dialog';
import { createTask, deleteTask, getTasks } from '../../services/api/tasks';
import store from '../../store';
import ViewTaskDialog from './ViewTaskDialog';
import TaskForm from './tasks-calendar/TaskForm';

function Tasks() {
  const tasksLoader = useLoaderData();

  const [showCreateTaskDialog, setShowCreateTaskDialog] = useState(false);
  const [showTaskView, setShowTaskView] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [taskDesc, setTaskDesc] = useState('');
  const [tasks, setTasks] = useState(tasksLoader);
  const t = useT();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { '*': view } = useParams();
  const [activeTab, setActiveTab] = useState(view);

  const location = useLocation();

  const taskFormRef = useRef(null);

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

      const newTask = {
        title: taskDesc,
        description: null,
        date: {
          start: moment().format('DD-MM-YYYY'),
          end: moment().format('DD-MM-YYYY'),
        },
        time: null,
      };

      await createTask(newTask);

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

  function mapTasksToEvents(tasks) {
    return tasks.map((task) => ({
      task: task,
      title: task.title,
      start: formatBackendDateForCalendar(task.date.start),
      end: formatBackendDateForCalendar(task.date.end),
    }));
  }

  function handleCreateTask() {
    taskFormRef.current.handleSubmit();
    setShowCreateTaskDialog(false);
  }

  async function updateTasks() {
    try {
      dispatch(auxActions.setLoading(true));

      const newTasks = await getTasks();

      setTasks(newTasks.data);
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(auxActions.setLoading(false));
    }
  }

  async function removeTask(taskId) {
    if (!taskId) {
      return;
    }

    console.log('deleting', taskId);
    try {
      dispatch(auxActions.setLoading(true));

      await deleteTask(taskId);

      setTasks(tasks.filter((task) => task.id !== taskId));
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
        <Button
          className="d-flex justify-content-center align-items-center"
          onClick={() => setShowCreateTaskDialog(true)}
        >
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
            <Nav.Link eventKey={TasksViewTypes.LIST}>{t('LIST')}</Nav.Link>
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
              events={mapTasksToEvents(tasks)}
              eventContent={TaskEvent}
              dateClick={(data) => console.log(data)}
              eventClick={(info) => {
                const task = info.event._def.extendedProps.task;
                setSelectedTask(task);
                setShowTaskView(true);
              }}
            />
          )}
          {view == TasksViewTypes.LIST && (
            <TasksList
              tasks={tasks}
              onDelete={removeTask}
              onViewTask={(task) => {
                setSelectedTask(task);
                setShowTaskView(true);
              }}
            />
          )}
          {view == TasksViewTypes.TABLE && <TasksTable />}
        </Card>
      </div>
      <Dialog
        show={showCreateTaskDialog}
        onHide={() => setShowCreateTaskDialog(false)}
        title={t('CREATE_TASK')}
        cancelLabel={t('CANCEL')}
        onCancel={() => setShowCreateTaskDialog(false)}
        confirmLabel={t('SAVE')}
        onConfirm={handleCreateTask}
        size="lg"
        centered
      >
        <TaskForm ref={taskFormRef} onUpdate={updateTasks} />
      </Dialog>
      <ViewTaskDialog
        task={selectedTask}
        isShow={showTaskView}
        onClose={() => setShowTaskView(false)}
      />
    </div>
  );
}

export default Tasks;

export async function loader() {
  try {
    store.dispatch(auxActions.setLoading(true));

    const response = await getTasks();
    console.log('response', response);

    store.dispatch(auxActions.setLoading(false));

    return response.data;
  } catch (e) {
    console.error(e);
  } finally {
    store.dispatch(auxActions.setLoading(false));
  }
  return [];
}
