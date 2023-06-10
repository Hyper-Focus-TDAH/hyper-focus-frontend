import moment from 'moment';

const TasksViewTypes = {
  CALENDAR: 'calendar',
  TABLE: 'table',
  LIST: 'list',
};

const TaskStatus = {
  TO_DO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

const DateTimeFormats = {
  DATE_BACKEND: 'DD-MM-YYYY',
  DATE_CALENDAR: 'YYYY-MM-DD',
  TIME_BACKEND: 'HH:mm:ss',
  TIME_FORM: 'HH:mm',
  DATE_TASK_LIST: 'MMM Do',
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

function formatBackendDateForCalendar(date) {
  if (!date || date === '') {
    return null;
  }
  return moment(date, DateTimeFormats.DATE_BACKEND).format(
    DateTimeFormats.DATE_CALENDAR
  );
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
  TaskStatus,
  TasksViewTypes,
  formatBackendDateForCalendar,
  formatCalendarDateForBackend,
  formatFormTimeForBackend,
  formatTaskDate,
  formatTaskTime,
};
