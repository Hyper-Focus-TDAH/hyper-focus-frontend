import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import { AiOutlineSend } from 'react-icons/ai';
import styles from './Chat.module.css';

function Chat() {
  function handleKeyDown(event) {
    if (event.key === 'Enter' && !disabled && onEnterPress) {
      // onEnterPress();
    }
  }

  return (
    <Card className={styles.container}>
      <Card.Header>
        <span className="h4">Chat</span>
      </Card.Header>
      <Card.Body></Card.Body>
      <Card.Footer>
        <InputGroup>
          <Form.Control onKeyDown={handleKeyDown} />
          <Button>
            <AiOutlineSend style={{ fontSize: '25px' }} />
          </Button>
        </InputGroup>
      </Card.Footer>
    </Card>
  );
}

export default Chat;
