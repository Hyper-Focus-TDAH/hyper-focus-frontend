import moment from 'moment';
import { useT } from '../i18n/translate';

const UserSummaryDateTypes = {
  DAY: 'day',
  MONTH: 'month',
  YEAR: 'year',
};

const UserSummaryValueTypes = {
  BOARD: 'board_count',
  COMMENT: 'comment_count',
  COMMUNITY: 'community_count',
  MESSAGE: 'message_count',
  NOTE: 'note_count',
  POST: 'post_count',
  TASK: 'task_count',
  TEST: 'test_count',
  ALL: 'all',
};

const ProfileChartTypes = {
  pieChart: 'PieChart',
  lineChart: 'LineChart',
  barChart: 'BarChart',
  bar: 'Bar',
};

function formatUserSummary(userSummary) {
  let _userSummary = userSummary;

  // the order of the next three functions is crucial
  _userSummary = _getFormattedUserSummary(_userSummary);

  return _userSummary;
}

function formatUserSummaryOptions(chartType, dateType, valueType) {
  const t = useT();

  const valueTypeTranslated = getValueTypeTranslated(valueType);
  const dateTypeTranslated = getDateTypeTranslated(dateType);

  switch (chartType) {
    case ProfileChartTypes.pieChart:
      return {
        title: t('SUMMARY.VALUE_BY_DATE', {
          value: valueTypeTranslated,
          date: dateTypeTranslated,
        }),
        pieHole: 0.4,
        is3D: false,
      };
    case ProfileChartTypes.barChart:
      return {
        title: t('SUMMARY.VALUE_BY_DATE', {
          value: valueTypeTranslated,
          date: dateTypeTranslated,
        }),
        subtitle: t('SUMMARY.VALUE_BY_DATE', {
          value: valueTypeTranslated,
          date: dateTypeTranslated,
        }),
        legend: { position: 'none' },
      };
    case ProfileChartTypes.bar:
      return {
        title: t('SUMMARY.VALUE_BY_DATE', {
          value: valueTypeTranslated,
          date: dateTypeTranslated,
        }),
        subtitle: t('SUMMARY.VALUE_BY_DATE', {
          value: valueTypeTranslated,
          date: dateTypeTranslated,
        }),
        legend: { position: 'none' },
      };
    case ProfileChartTypes.lineChart:
      return {
        title: t('SUMMARY.VALUE_BY_DATE', {
          value: valueTypeTranslated,
          date: dateTypeTranslated,
        }),
        curveType: 'function',
        legend: { position: 'bottom' },
      };
  }
}

function getValueTypeTranslated(valueType) {
  const t = useT();

  switch (valueType) {
    case UserSummaryValueTypes.BOARD:
      return t('SUMMARY.VALUE.BOARD');
    case UserSummaryValueTypes.COMMENT:
      return t('SUMMARY.VALUE.COMMENT');
    case UserSummaryValueTypes.COMMUNITY:
      return t('SUMMARY.VALUE.COMMUNITY');
    case UserSummaryValueTypes.MESSAGE:
      return t('SUMMARY.VALUE.MESSAGE');
    case UserSummaryValueTypes.NOTE:
      return t('SUMMARY.VALUE.NOTE');
    case UserSummaryValueTypes.POST:
      return t('SUMMARY.VALUE.POST');
    case UserSummaryValueTypes.TASK:
      return t('SUMMARY.VALUE.TASK');
    case UserSummaryValueTypes.TEST:
      return t('SUMMARY.VALUE.TEST');
  }
}

function getDateTypeTranslated(dateType) {
  const t = useT();

  switch (dateType) {
    case UserSummaryDateTypes.DAY:
      return t('SUMMARY.DATE.DAY');
    case UserSummaryDateTypes.MONTH:
      return t('SUMMARY.DATE.MONTH');
    case UserSummaryDateTypes.YEAR:
      return t('SUMMARY.DATE.YEAR');
  }
}

function formatUserSummaryData(data, dateType, valueType) {
  try {
    if (!data?.length) {
      return;
    }

    const t = useT();

    const header = [dateType, valueType];

    if (valueType === UserSummaryValueTypes.ALL) {
      const boardLabel = getValueTypeTranslated(UserSummaryValueTypes.BOARD);
      let boardList = [boardLabel, 0];
      const commentLabel = getValueTypeTranslated(
        UserSummaryValueTypes.COMMENT
      );
      let commentList = [commentLabel, 0];
      const communityLabel = getValueTypeTranslated(
        UserSummaryValueTypes.COMMUNITY
      );
      let communityList = [communityLabel, 0];
      const messageLabel = getValueTypeTranslated(
        UserSummaryValueTypes.MESSAGE
      );
      let messageList = [messageLabel, 0];
      const noteLabel = getValueTypeTranslated(UserSummaryValueTypes.NOTE);
      let noteList = [noteLabel, 0];
      const postLabel = getValueTypeTranslated(UserSummaryValueTypes.POST);
      let postList = [postLabel, 0];
      const taskLabel = getValueTypeTranslated(UserSummaryValueTypes.TASK);
      let taskList = [taskLabel, 0];
      const testLabel = getValueTypeTranslated(UserSummaryValueTypes.TEST);
      let testList = [testLabel, 0];

      formatUserSummary(data).forEach((summary) => {
        boardList[1] = boardList[1] + +summary[UserSummaryValueTypes.BOARD];
        commentList[1] =
          commentList[1] + +summary[UserSummaryValueTypes.COMMENT];
        communityList[1] =
          communityList[1] + +summary[UserSummaryValueTypes.COMMUNITY];
        messageList[1] =
          messageList[1] + +summary[UserSummaryValueTypes.MESSAGE];
        noteList[1] = noteList[1] + +summary[UserSummaryValueTypes.NOTE];
        postList[1] = postList[1] + +summary[UserSummaryValueTypes.POST];
        taskList[1] = taskList[1] + +summary[UserSummaryValueTypes.TASK];
        testList[1] = testList[1] + +summary[UserSummaryValueTypes.TEST];
      });
      console.log('oii', [
        header,
        boardList,
        commentList,
        communityList,
        messageList,
        noteList,
        postList,
        taskList,
        testList,
      ]);
      return [
        header,
        boardList,
        commentList,
        communityList,
        messageList,
        noteList,
        postList,
        taskList,
        testList,
      ];
    }

    let formattedList;
    switch (dateType) {
      case UserSummaryDateTypes.DAY:
        formattedList = formatUserSummary(data).map((summary) => {
          const label = summary.day;
          const value = +summary[valueType];

          return [label, value];
        });
        return [header, ...formattedList];
      case UserSummaryDateTypes.MONTH:
        formattedList = formatUserSummary(data).map((summary) => {
          const label = t(`MONTHS.${summary.month}`);
          const value = +summary[valueType];

          return [label, value];
        });
        return [header, ...formattedList];
      case UserSummaryDateTypes.YEAR:
        formattedList = formatUserSummary(data).map((summary) => {
          const label = summary.year;
          const value = +summary[valueType];

          return [label, value];
        });
        return [header, ...formattedList];
      default:
        throw new Error(
          'Invalid `UserSummaryDateType` param value on formatUserSummaryData();'
        );
    }
  } catch (e) {
    console.error(e);
  }
}

function _getFormattedUserSummary(userSummary) {
  return userSummary.map((summary) => ({
    ...summary,
    year: moment(summary.created_at, 'YYYY/MM/DD').format('YYYY'),
    month: moment(summary.created_at, 'YYYY/MM/DD').format('M'),
    day: moment(summary.created_at, 'YYYY/MM/DD').format('D'),
  }));
}

export {
  ProfileChartTypes,
  UserSummaryDateTypes,
  UserSummaryValueTypes,
  formatUserSummary,
  formatUserSummaryData,
  formatUserSummaryOptions,
};
