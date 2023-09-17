import styles from './SelectBoard.module.css';

function SelectBoard({ boards = [], selected, onSelect }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
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
    </div>
  );
}

export default SelectBoard;
