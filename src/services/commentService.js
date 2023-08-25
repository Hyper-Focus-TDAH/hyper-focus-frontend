import { getHoursOrDaysSinceDate } from '../utils';

function formatComments(comments) {
  let _comments = comments;

  // the order of the next three functions is crucial
  _comments = _getSortedComments(_comments);
  _comments = _getFormattedComments(_comments);
  _comments = _getRemapComments(_comments);

  return _comments;
}

function _getSortedComments(comments) {
  return comments.slice().sort((a, b) => {
    const timestampA = new Date(a.created_at);
    const timestampB = new Date(b.created_at);

    if (timestampA < timestampB) {
      return -1;
    }
    if (timestampA > timestampB) {
      return 1;
    }
    return 0;
  });
}

function _getFormattedComments(comments) {
  return comments.map((comment) => ({
    ...comment,
    created_at: getHoursOrDaysSinceDate(comment.created_at),
    updated_at: getHoursOrDaysSinceDate(comment.updated_at),
  }));
}

function _getRemapComments(sortedComments) {
  const remappedComments = [];

  for (let i = sortedComments.length - 1; i >= 0; i--) {
    const comment = sortedComments[i];

    if (comment.parentComment?.id) {
      const index = sortedComments.findIndex(
        (c) => c.id === comment.parentComment.id
      );

      if (!sortedComments[index].replies) {
        sortedComments[index].replies = [];
      }

      sortedComments[index].replies.unshift(comment);
    } else {
      remappedComments.unshift(comment);
    }
  }

  return remappedComments;
}

export { formatComments };
