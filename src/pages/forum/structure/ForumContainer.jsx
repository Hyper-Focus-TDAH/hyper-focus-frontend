import React from 'react';
import ForumHeader from '../structure/ForumHeader';

function ForumContainer({ children }) {
  const forumHeight = 69;

  return (
    <div>
      <ForumHeader height={forumHeight} />
      <div style={{ height: `${forumHeight}px` }} />
      {children}
    </div>
  );
}

export default ForumContainer;
