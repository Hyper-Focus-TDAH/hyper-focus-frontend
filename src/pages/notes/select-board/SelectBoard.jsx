import styles from './SelectBoard.module.css';

function SelectBoard({ boards = [], selected, onSelect }) {
  return (
    <div className={styles.container}>
      {boards.map((board) => (
        <div
          key={board.id}
          style={{ backgroundColor: board.color, margin: '6px' }}
          onClick={() => {
            if (onSelect) {
              onSelect(board);
            }
          }}
        >
          {selected?.id == board.id ? '> ' : ''} {board.title}
        </div>
      ))}
    </div>
  );
}

export default SelectBoard;
