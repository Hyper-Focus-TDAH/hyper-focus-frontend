async function getFormattedComments(comments) {
  const sortedComments = _getSortedComments(comments);

  const remappedComments = _remapComments(sortedComments);

  return remappedComments;
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

function _remapComments(sortedComments) {
  const remappedComments = [];

  for (let i = sortedComments.length - 1; i >= 0; i--) {
    const comment = sortedComments[i];

    if (comment.parentCommentId) {
      const index = sortedComments.findIndex(
        (c) => c.id === comment.parentCommentId
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

export { getFormattedComments };
