import classes from './OptionsItem.module.css'

import { useState } from "react";

import { OverlayTrigger, ListGroup } from "react-bootstrap";

import { IoMdArrowDropright } from "react-icons/io";

import Options from "./Options";

function OptionsItem({ content, options, onClick }) {
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringChildren, setIsHoveringChildren] = useState(false);

  async function handleMouseEnter() {
    setIsHovering(true);
  }

  async function handleMouseLeave() {
    if (isHoveringChildren) {
      return;
    }
    setIsHovering(false);
  }

  function handleStartHoveringChildren() {
    setIsHoveringChildren(true);
  }

  function handleEndHoveringChildren() {
    setIsHoveringChildren(false);
  }

  if (options) {
    return (
      <OverlayTrigger
        show={isHovering}
        placement="right-start"
        overlay={
          <Options
            options={options}
            onMouseLeave={handleEndHoveringChildren}
            onMouseEnter={handleStartHoveringChildren}
          />
        }
      >
        <ListGroup.Item
          className={`${classes.optionItem} d-flex justify-content-between align-items-center pr-1`}
          style={{
            backgroundColor: isHovering
              ? "red"
              : isHoveringChildren
              ? "blue"
              : "white",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {content}
          <IoMdArrowDropright />
        </ListGroup.Item>
      </OverlayTrigger>
    );
  } else {
    return (
      <ListGroup.Item
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={classes.optionItem}
        onClick={onClick}
      >
        {content}
      </ListGroup.Item>
    );
  }
}

export default OptionsItem;
