import EmptyState from '../../../components/empty-state/EmptyState';
import { t } from '../../../i18n/translate';
import Note from '../Note';
import styles from './Board.module.css';

function Board({ board, notes, removeNote, updateNote }) {
  return (
    <div className={styles.container} style={{ backgroundColor: board.color }}>
      <h2 className="mt-4">{board?.title}</h2>
      {!board?.id && <EmptyState message={t('EMPTY_STATE.BOARDS')} />}
      <div className="d-flex flex-wrap justify-content-start align-items-start">
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
    </div>
  );
}

export default Board;
