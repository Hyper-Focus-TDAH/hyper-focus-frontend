import { Card } from 'react-bootstrap';
import { BsThreeDots } from 'react-icons/bs';
import IconButton from '../../../components/buttons/icon-button/IconButton';
import styles from './SelectBoard.module.css';

function SelectBoard({ boards = [], selected, onSelect, editBoard }) {
  return (
    <Card className={styles.container}>
      <h5>Boards</h5>
      <div className={styles.content}>
        {boards.map((board) => (
          <div key={board.id} className={styles['board-item']}>
            <div
              className={styles.circle}
              style={{
                backgroundColor: board.color,
                width: selected.id == board.id ? '10px' : '8px',
                height: selected.id == board.id ? '10px' : '8px',
                margin:
                  selected.id == board.id
                    ? '6px 5px 6px 5px'
                    : '6px 6px 6px 6px',
              }}
            />
            <div
              onClick={() => {
                if (onSelect) {
                  onSelect(board);
                }
              }}
              className={styles.title}
              style={{
                textDecoration: selected.id == board.id ? 'underline' : '',
              }}
            >
              {board.title}
            </div>
            <IconButton
              icon={<BsThreeDots style={{ fontSize: '20px' }} />}
              onClick={() => {
                if (editBoard) {
                  editBoard(board);
                }
              }}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}

export default SelectBoard;
