import { Card } from 'react-bootstrap';
import { BsThreeDots } from 'react-icons/bs';
import OptionsButton from '../../../components/buttons/options-button/OptionsButton';
import { t } from '../../../i18n/translate';
import styles from './SelectBoard.module.css';

const options = [
  {
    id: 'edit',
    content: t('EDIT'),
    onClick: () => setShowEditDialog(true),
  },
  {
    id: 'delete',
    content: t('DELETE'),
    onClick: () => setShowConfirmDeleteDialog(true),
  },
];

function SelectBoard({ boards = [], selected, onSelect }) {
  return (
    <Card className={styles.container}>
      <h5>Boards</h5>
      <div className={styles.content}>
        {boards.map((board) => (
          <div key={board.id} className={styles['board-item']}>
            <div
              className={styles.circle}
              style={{ backgroundColor: board.color }}
            />
            <div
              onClick={() => {
                if (onSelect) {
                  onSelect(board);
                }
              }}
              className={styles.title}
            >
              {board.title}
            </div>
            <OptionsButton options={options} icon={<BsThreeDots />} />
          </div>
        ))}
      </div>
    </Card>
  );
}

export default SelectBoard;
