import { Card, Row } from 'react-bootstrap';
import styles from './AuxiliarChatMessage.module.css';

function AuxiliarChatMessage({ date }) {
  return (
    <Row className={styles.container}>
      <Card className={styles.message}>
        <div className={styles.date}>{date}</div>
      </Card>
    </Row>
  );
}

export default AuxiliarChatMessage;
