import styles from './TaskList.module.css';

import { useContext, useMemo } from 'react';
import { Accordion, AccordionContext, Card } from 'react-bootstrap';
import Divider from '../../../components/Divider';
import { TaskStatus } from '../tasksConfig';
import TaskListItem from './TaskListItem';

import { useAccordionButton } from 'react-bootstrap';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import EmptyState from '../../../components/EmptyState';
import IconButton from '../../../components/IconButton';
import { t } from '../../../i18n/translate';

function CustomToggle({ label, eventKey }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey, () => {});

  return (
    <Card.Header onClick={decoratedOnClick} className={styles.header}>
      {activeEventKey === eventKey ? (
        <IconButton style={{ fontSize: '22px' }} icon={<BsChevronDown />} />
      ) : (
        <IconButton style={{ fontSize: '22px' }} icon={<BsChevronUp />} />
      )}
      <span className="h5 m-0">{label}</span>
    </Card.Header>
  );
}

function TasksList({ tasks = [], onEdit, onDelete, onViewTask, onSetIsDone }) {
  const tasksOrderedAlphabetically = useMemo(() => {
    const orderedTasks = tasks;

    orderedTasks.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();

      if (titleA < titleB) {
        return -1;
      } else if (titleA > titleB) {
        return 1;
      }

      return 0;
    });

    return orderedTasks;
  }, [tasks]);

  const doneTasks = useMemo(() => {
    return tasksOrderedAlphabetically.filter(
      (task) => task.status === TaskStatus.DONE
    );
  }, [tasksOrderedAlphabetically]);

  const todoTasks = useMemo(() => {
    return tasksOrderedAlphabetically.filter(
      (task) => task.status === TaskStatus.TO_DO
    );
  }, [tasksOrderedAlphabetically]);

  return (
    <div>
      {todoTasks.length > 0 || doneTasks.length > 0 ? (
        <div>
          <Accordion defaultActiveKey="0">
            <CustomToggle eventKey="0" label="To Do"></CustomToggle>
            <Accordion.Collapse eventKey="0">
              {todoTasks.length > 0 ? (
                <div>
                  {...todoTasks.map((task, index) => (
                    <div>
                      <TaskListItem
                        key={task.id}
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onViewTask={onViewTask}
                        onSetIsDone={onSetIsDone}
                      />
                      {index < todoTasks.length - 1 && <Divider />}
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState message={t('EMPTY_STATE.TODO_TASKS')} />
              )}
            </Accordion.Collapse>
          </Accordion>
          <Accordion>
            <CustomToggle eventKey="1" label="Done" />
            <Accordion.Collapse eventKey="1">
              {doneTasks.length > 0 ? (
                <div>
                  {...doneTasks.map((task, index) => (
                    <div>
                      <TaskListItem
                        key={task.id}
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onViewTask={onViewTask}
                        onSetIsDone={onSetIsDone}
                      />
                      {index < doneTasks.length - 1 && <Divider />}
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState message={t('EMPTY_STATE.DONE_TASKS')} />
              )}
            </Accordion.Collapse>
          </Accordion>
        </div>
      ) : (
        <EmptyState message={t('EMPTY_STATE.TASKS')} />
      )}
    </div>
  );
}

export default TasksList;
