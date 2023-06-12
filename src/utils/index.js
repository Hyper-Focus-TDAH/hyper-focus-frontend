import moment from 'moment';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const DateTimeFormats = {
  DATE_BACKEND: 'DD-MM-YYYY',
  DATE_CALENDAR: 'YYYY-MM-DD',
  DATE_FORM: 'YYYY-MM-DD',
  DATE_TASK_LIST: 'MMM Do',
  TIME_BACKEND: 'HH:mm:ss',
  TIME_FORM: 'HH:mm',
  TIME_TASK_LIST: 'hh:mm A',
};

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

export {
  formatBackendDateForForm,
  formatBackendDateForForm2,
  formatBackendDateTimeForCalendar,
  formatCalendarDateForBackend,
  formatFormTimeForBackend,
  formatTaskDate,
  formatTaskTime,
  sleep,
};
