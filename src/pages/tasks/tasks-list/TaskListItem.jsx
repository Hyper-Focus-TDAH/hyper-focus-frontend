import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { BsTrash3 } from 'react-icons/bs';
import Dialog from '../../../components/Dialog';
import Divider from '../../../components/Divider';
import IconButton from '../../../components/IconButton';
import { t } from '../../../i18n/translate';
import { formatTaskDate, formatTaskTime } from '../tasksConfig';
import styles from './TaskListItem.module.css';

function TaskListItem({ task, onDelete, onViewTask }) {
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);

  const dateStart = formatTaskDate(task.date?.start);
  const timeStart = formatTaskTime(task.time?.start);
  const dateEnd = formatTaskDate(task.date?.end);
  const timeEnd = formatTaskTime(task.time?.end);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Form.Check className={styles.check} value={false} />
          <div
            className={styles.body}
            onClick={() => {
              onViewTask(task);
            }}
          >
            <div className={styles['first-row']}>
              <span>{task.title}</span>
            </div>
            <div className={styles['second-row']}>
              <span>{dateStart}</span>
              {timeStart && <span>, {timeStart}</span>}
              {dateEnd && <span> - {dateEnd}</span>}
              {timeEnd && <span>, {timeEnd}</span>}
            </div>

            {/* <span>{task.description}</span> */}
          </div>
          {/* {JSON.stringify(task)} */}
        </div>
        <IconButton
          icon={<BsTrash3 />}
          style={{ fontSize: '20px' }}
          onClick={() => setShowConfirmDeleteDialog(true)}
        />
      </div>
      <Divider />
      <Dialog
        show={showConfirmDeleteDialog}
        onHide={() => setShowConfirmDeleteDialog(false)}
        title={t('CONFIRM_DELETE_TASK')}
        subtitle={t('THIS_ACTION_CANNOT_BE_UNDONE')}
        cancelLabel={t('CANCEL')}
        onCancel={() => setShowConfirmDeleteDialog(false)}
        confirmLabel={t('DELETE')}
        confirmColor="danger"
        onConfirm={() => {
          onDelete(task.id);
          setShowConfirmDeleteDialog(false);
        }}
        escDismiss
        centered
      />
    </>
  );
}

export default TaskListItem;
