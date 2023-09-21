import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { BsPencil, BsTrash3 } from 'react-icons/bs';
import IconButton from '../../../components/buttons/icon-button/IconButton';
import { formatTaskDate, formatTaskTime } from '../../../utils';
import { TaskStatus } from '../tasksConfig';
import styles from './TaskListItem.module.css';

function TaskListItem({ task, onEdit, onDelete, onViewTask, onSetIsDone }) {
  const [isDone, setIsDone] = useState(task.status === TaskStatus.DONE);
  const dateStart = formatTaskDate(task.date?.start);
  const timeStart = formatTaskTime(task.time?.start);
  const dateEnd = formatTaskDate(task.date?.end);
  const timeEnd = formatTaskTime(task.time?.end);

  function handleTaskIsDoneChange(event) {
    setIsDone(event.target.checked);
    const status = event.target.checked ? TaskStatus.DONE : TaskStatus.TO_DO;
    onSetIsDone({ ...task, status });
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Form.Check
          className={styles.check}
          checked={isDone}
          onChange={handleTaskIsDoneChange}
        />
        <div className={styles.body} onClick={() => onViewTask(task)}>
          <div className={styles['first-row']}>
            <span className={isDone ? styles.done : ''}>{task.title}</span>
          </div>
          <div className={styles['second-row']}>
            <span>{dateStart}</span>
            {timeStart && <span>, {timeStart}</span>}
            {dateEnd && <span> - {dateEnd}</span>}
            {timeEnd && <span>, {timeEnd}</span>}
          </div>
        </div>
      </div>
      <div className={styles.end}>
        <IconButton
          icon={<BsPencil />}
          style={{ fontSize: '20px', padding: '6px', marginRight: '8px' }}
          onClick={() => onEdit(task)}
        />
        <IconButton
          icon={<BsTrash3 />}
          style={{ fontSize: '20px', padding: '6px', marginRight: '8px' }}
          onClick={() => onDelete(task)}
        />
      </div>
    </div>
  );
}

export default TaskListItem;
