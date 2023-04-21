import { useState } from 'react';

import { OverlayTrigger } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';

import CIconButton from './CIconButton';
import COptions from './options/COptions';

function COptionsButton({ options }) {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <OverlayTrigger
      show={isShowing}
      trigger="click"
      placement="right-start"
      overlay={
        <COptions options={options} onMouseLeave={() => setIsShowing(false)} />
      }
    >
      <CIconButton
        icon={<BsThreeDotsVertical />}
        size="22px"
        padding="0px"
        onClick={() => setIsShowing(true)}
      />
    </OverlayTrigger>
  );
}

export default COptionsButton;
