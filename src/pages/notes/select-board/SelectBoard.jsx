import { Card } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import IconButton from '../../../components/buttons/icon-button/IconButton';
import styles from './SelectBoard.module.css';

function SelectBoard({
  boards = [],
  selected,
  onSelect,
  onEditBoard,
  onCreateBoard,
}) {
  return (
    <Card className={styles.container}>
      <div className={styles.header}>
        <span className="h5 m-0">Boards</span>
        <IconButton
          className="p-0"
          icon={<BsPlus style={{ fontSize: '30px' }} />}
          onClick={onCreateBoard}
        />
      </div>
      {!!boards?.length && (
        <div className={styles.content}>
          {boards.map((board) => (
            <div key={board.id} className={styles['board-item']}>
              <div
                className={styles.circle}
                style={{
                  backgroundColor: board.color,
                  width: selected?.id == board.id ? '10px' : '8px',
                  height: selected?.id == board.id ? '10px' : '8px',
                  margin:
                    selected?.id == board.id
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
                className={styles['title-container']}
                style={{
                  textDecoration: selected?.id == board.id ? 'underline' : '',
                }}
              >
                <span className={styles.title}>{board.title}</span>
              </div>
              {/* <IconButton
                icon={<BsThreeDots style={{ fontSize: '20px' }} />}
                onClick={() => {
                  if (onEditBoard) {
                    onEditBoard(board);
                  }
                }}
              /> */}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default SelectBoard;
