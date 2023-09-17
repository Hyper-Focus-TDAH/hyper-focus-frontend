import ScrollContainer from 'react-indiana-drag-scroll';
import Note from '../Note';
import styles from './Board.module.css';

function Board({ board, notes, removeNote, updateNote }) {
  return (
    <ScrollContainer
      ignoreElements=".hyper-focus-note"
      hideScrollbars={false}
      className={styles['scroll-container']}
    >
      <div className={styles.board} style={{ backgroundColor: board.color }}>
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            text={note.text}
            color={note.color}
            onRemove={removeNote}
            onChange={updateNote}
          />
        ))}
      </div>
    </ScrollContainer>
  );
}

export default Board;
