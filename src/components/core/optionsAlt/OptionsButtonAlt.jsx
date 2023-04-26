import { useState, useEffect, useRef } from 'react';

import { OverlayTrigger } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';

import IconButton from '../IconButton';
import Options from './Options';

function useOutsideAlerter(ref) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        alert('You clicked outside of me!');
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}

function OptionsButtonAlt({ options }) {
  const [isShowing, setIsShowing] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <OverlayTrigger
      show={isShowing}
      trigger="click"
      placement="right-start"
      overlay={
        <Options
          ref={wrapperRef}
          options={options}
          onMouseLeave={() => setIsShowing(false)}
        />
      }
    >
      <IconButton
        icon={<BsThreeDotsVertical />}
        size="22px"
        padding="0px"
        onClick={() => setIsShowing(!isShowing)}
      />
    </OverlayTrigger>
  );
}

export default OptionsButtonAlt;
