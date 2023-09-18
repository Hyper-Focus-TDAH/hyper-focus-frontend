import ScrollContainer from 'react-indiana-drag-scroll';
import Note from '../Note';
import styles from './Board.module.css';

function addAlpha(color, opacity) {
  // coerce values so ti is between 0 and 1.
  var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}

function Board({ board, notes, removeNote, updateNote }) {
  return (
    <ScrollContainer
      ignoreElements=".hyper-focus-note"
      hideScrollbars={false}
      className={`hyper-focus-board ${styles['scroll-container']}`}
    >
      <div
        className={styles.board}
        style={{
          backgroundColor: addAlpha(board.color, 0.75),
          width: 2000,
          height: 2000,
        }}
      >
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            boardId={board.id}
            text={note.text}
            color={note.color}
            placement={note.placement}
            onRemove={removeNote}
            onChange={updateNote}
          />
        ))}
      </div>
    </ScrollContainer>
  );
}

export default Board;
