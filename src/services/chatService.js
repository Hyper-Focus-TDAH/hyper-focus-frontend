import HTMLReactParser from 'html-react-parser';
import moment from 'moment';
import { t } from '../i18n/translate';
import { DateTimeFormats } from '../utils';

const weekdaysLabels = {
  1: t('WEEKDAYS.MONDAY'),
  2: t('WEEKDAYS.TUESDAY'),
  3: t('WEEKDAYS.WEDNESDAY'),
  4: t('WEEKDAYS.THURSDAY'),
  5: t('WEEKDAYS.FRIDAY'),
  6: t('WEEKDAYS.SATURDAY'),
  7: t('WEEKDAYS.SUNDAY'),
};

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
    const messageMoment = moment(message.updated_at ?? message.created_at);

    const diff = moment(moment.now()).diff(messageMoment, 'days');
    let date;

    if (diff < 7) {
      let weekdayIso = messageMoment.isoWeekday();
      date = weekdaysLabels[weekdayIso];
    } else {
      date = messageMoment.format(DateTimeFormats.DATE_CHAT);
    }

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
