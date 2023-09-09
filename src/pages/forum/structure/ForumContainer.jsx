import React from 'react';
import ForumHeader from '../forum-header/ForumHeader';

function ForumContainer({ children, initialSelectedPage }) {
  const forumHeight = 69;

  return (
    <div>
      <ForumHeader
        initialSelectedPage={initialSelectedPage}
        height={forumHeight}
      />
      <div style={{ height: `${forumHeight}px` }} />
      {children}
    </div>
  );
}

export default ForumContainer;
