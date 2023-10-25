import HTMLReactParser from 'html-react-parser';
import moment from 'moment';
import { DateTimeFormats } from '../utils';

function formatChat(chat) {
  let _chat = chat;

  // the order of the next two functions is crucial
  _chat = _getSortedChatMessages(_chat);
  _chat = _getFormattedMessages(_chat);
  _chat = _includeAuxiliarMessages(_chat);

  return _chat;
}

function _getSortedChatMessages(chat) {
  return chat.slice().sort((a, b) => {
    const timestampA = new Date(a.created_at);
    const timestampB = new Date(b.created_at);

    if (timestampA > timestampB) {
      return 1;
    }
    if (timestampA < timestampB) {
      return -1;
    }
    return 0;
  });
}

function _getFormattedMessages(messages) {
  const remappedMessages = messages.map((msg) => formatMessage(msg));
  return remappedMessages;
}

function _includeAuxiliarMessages(messages) {
  const newMessages = [];
  let lastDate;
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    const date = moment(message.updated_at ?? message.created_at).format(
      DateTimeFormats.DATE_BACKEND
    );
    if (lastDate != date) {
      newMessages.push({
        isAux: true,
        id: `auxDate${message.id}`,
        date: date,
      });
      lastDate = date;
    }
    newMessages.push(message);
  }
  return newMessages;
}

function formatMessage(message) {
  return {
    ...message,
    parsedText: HTMLReactParser(message.text),
    time: moment(
      message.updated_at ?? message.created_at,
      DateTimeFormats.DATE_DATABASE
    ).format(DateTimeFormats.TIME_TASK_LIST),
  };
}

export { formatChat };
