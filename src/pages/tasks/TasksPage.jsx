import styles from './TasksPage.module.css';

import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  Container,
  Form,
  InputGroup,
  Nav,
} from 'react-bootstrap';
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
import { TaskStatus, TasksViewTypes } from './tasksConfig';

import Dialog from '../../components/Dialog';
import {
  createTask,
  deleteTask,
  editTask,
  getTasks,
} from '../../services/api/tasksApi';
import store from '../../store';
import {
  formatBackendDateTimeForCalendar,
  formatCalendarDateForBackend,
} from '../../utils';
import TaskForm from './TaskForm';
import ViewTaskDialog from './ViewTaskDialog';

function TasksPage() {
  const tasksLoader = useLoaderData();

  const [showCreateTaskDialog, setShowCreateTaskDialog] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
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

  async function handleKeyDown(event) {
    if (event.key === 'Enter') {
      await addTask();
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
        status: TaskStatus.TO_DO,
      };

      await createTask(newTask);

      setTasks((oldTasks) => {
        const newTasks = [newTask, ...oldTasks];
        return newTasks;
      });

      setTaskDesc('');

      await updateTasks();
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
      start: formatBackendDateTimeForCalendar(
        task.date?.start,
        task.time?.start
      ),
      end: formatBackendDateTimeForCalendar(task.date?.end, task.time?.end),
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

  async function handleSetTaskIsDone(task) {
    try {
      dispatch(auxActions.setLoading(true));

      const taskId = task.id;

      delete task.id;

      await editTask(taskId, task);

      await updateTasks();
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(auxActions.setLoading(false));
    }
  }

  return (
    <Container className="container-margin-bottom">
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
        <Card style={{ marginTop: '50px' }}>
          {view == TasksViewTypes.CALENDAR && (
            <div className="p-3">
              <TasksCalendar
                events={mapTasksToEvents(tasks)}
                eventContent={TaskEvent}
                dateClick={(data) => {
                  setSelectedTask({
                    date: { start: formatCalendarDateForBackend(data.dateStr) },
                  });
                  setShowCreateTaskDialog(true);
                }}
                eventClick={(info) => {
                  const task = info.event._def.extendedProps.task;
                  setSelectedTask(task);
                  setShowTaskView(true);
                }}
              />
            </div>
          )}
          {view == TasksViewTypes.LIST && (
            <TasksList
              tasks={tasks}
              onDelete={(task) => {
                setSelectedTask(task);
                setShowConfirmDeleteDialog(true);
              }}
              onEdit={(task) => {
                setSelectedTask(task);
                setShowCreateTaskDialog(true);
              }}
              onViewTask={(task) => {
                setSelectedTask(task);
                setShowTaskView(true);
              }}
              onSetIsDone={handleSetTaskIsDone}
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
        onCancel={() => {
          setShowCreateTaskDialog(false);
          setSelectedTask(null);
        }}
        confirmLabel={t('SAVE')}
        onConfirm={handleCreateTask}
        size="lg"
        centered
      >
        <TaskForm
          ref={taskFormRef}
          onUpdate={() => {
            setShowCreateTaskDialog(false);
            updateTasks();
          }}
          initialState={selectedTask}
        />
      </Dialog>
      <Dialog
        show={showConfirmDeleteDialog}
        onHide={() => setShowConfirmDeleteDialog(false)}
        title={t('CONFIRM_DELETE_TASK')}
        subtitle={t('THIS_ACTION_CANNOT_BE_UNDONE')}
        cancelLabel={t('CANCEL')}
        onCancel={() => {
          setSelectedTask(null);
          setShowConfirmDeleteDialog(false);
        }}
        confirmLabel={t('DELETE')}
        confirmColor="danger"
        onConfirm={() => {
          removeTask(selectedTask.id);
          setShowConfirmDeleteDialog(false);
          setSelectedTask(null);
        }}
        escDismiss
        centered
      />
      <ViewTaskDialog
        task={selectedTask}
        isShow={showTaskView}
        onClose={() => setShowTaskView(false)}
        onDelete={(task) => {
          setSelectedTask(task);
          setShowTaskView(false);
          setShowConfirmDeleteDialog(true);
        }}
        onEdit={(task) => {
          setSelectedTask(task);
          setShowTaskView(false);
          setShowCreateTaskDialog(true);
        }}
        onCancel={() => setSelectedTask(null)}
      />
    </Container>
  );
}

export default TasksPage;

export async function loader() {
  try {
    store.dispatch(auxActions.setLoading(true));

    const response = await getTasks();

    store.dispatch(auxActions.setLoading(false));

    return response.data;
  } catch (e) {
    if (e.status !== 404) {
      console.error(e);
    }
  } finally {
    store.dispatch(auxActions.setLoading(false));
  }
  return [];
}
