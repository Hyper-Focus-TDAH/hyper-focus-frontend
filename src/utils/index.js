import moment from 'moment';
import { t } from '../i18n/translate';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const DateTimeFormats = {
  DATE_BACKEND: 'DD-MM-YYYY',
  DATE_DATABASE: 'YYYY-MM-DD HH:mm:ss.SSSSSS',
  DATE_CALENDAR: 'YYYY-MM-DD',
  DATE_FORM: 'YYYY-MM-DD',
  DATE_TASK_LIST: 'MMM Do',
  TIME_BACKEND: 'HH:mm:ss',
  TIME_FORM: 'HH:mm',
  TIME_TASK_LIST: 'hh:mm A',
  DATETIME_ADHD_TEST: 'YYYY/MM/DD HH:mm',
};

function getHoursOrDaysSinceDate(date) {
  const currentDate = moment();
  const oldDate = moment(date);

  const days = currentDate.diff(oldDate, 'days');
  const hours = currentDate.diff(oldDate, 'hours');

  if (days > 0) {
    return t('X_DAYS_AGO', { x: days });
  }
  return t('X_HOURS_AGO', { x: hours });
}

function formatCalendarDateForBackend(date) {
  if (!date || date === '') {
    return null;
  }
  return moment(date, DateTimeFormats.DATE_CALENDAR).format(
    DateTimeFormats.DATE_BACKEND
  );
}

function formatBackendDateTimeForCalendar(date, time) {
  if (!date || date === '') {
    return null;
  }
  let value = moment(date, DateTimeFormats.DATE_BACKEND).format(
    DateTimeFormats.DATE_CALENDAR
  );
  if (time && time !== '') {
    value += `T${time}`;
  }
  return value;
}

function formatDatabaseDateForADHDTest(timestamp) {
  return moment(timestamp, DateTimeFormats.DATE_DATABASE).format(
    DateTimeFormats.DATETIME_ADHD_TEST
  );
}

function formatBackendDateForForm(date) {
  if (!date || date === '') {
    return null;
  }
  return moment(date, DateTimeFormats.DATE_BACKEND).format(
    DateTimeFormats.DATE_FORM
  );
}

function formatBackendDateForForm2(date) {
  const momentDate = moment(date);
  return momentDate.format(DateTimeFormats.DATE_FORM);
}

function formatFormTimeForBackend(time) {
  if (!time || time === '') {
    return null;
  }
  return moment(time, DateTimeFormats.TIME_FORM).format(
    DateTimeFormats.TIME_BACKEND
  );
}

function formatTaskDate(date) {
  if (!date) {
    return '';
  }
  return moment(date, DateTimeFormats.DATE_BACKEND).format(
    DateTimeFormats.DATE_TASK_LIST
  );
}

function formatTaskTime(time) {
  if (!time) {
    return '';
  }
  return moment(time, DateTimeFormats.TIME_BACKEND).format(
    DateTimeFormats.TIME_TASK_LIST
  );
}

function removeHtmlTags(html) {
  const regex = /(<([^>]+)>)/gi;
  return html.replace(regex, '');
}

export {
  DateTimeFormats,
  formatBackendDateForForm,
  formatBackendDateForForm2,
  formatBackendDateTimeForCalendar,
  formatCalendarDateForBackend,
  formatDatabaseDateForADHDTest,
  formatFormTimeForBackend,
  formatTaskDate,
  formatTaskTime,
  getHoursOrDaysSinceDate,
  removeHtmlTags,
  sleep,
};
