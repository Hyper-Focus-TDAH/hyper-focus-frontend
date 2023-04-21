import { ListGroup } from "react-bootstrap";
import { forwardRef } from "react";

import COptionsItem from "./COptionsItem";

const COptions = forwardRef((props, ref) => {
  return (
    <ListGroup
      ref={ref}
      className={props.className}
      options={props.options}
      placement={props.placement}
      popper={props.popper}
      style={props.style}
      onMouseLeave={props.onMouseLeave}
      onMouseEnter={props.onMouseEnter}
      variant="flush"
    >
      {props.options.map((option) => (
        <COptionsItem
          key={option.id}
          content={option.content}
          options={option.options}
          onClick={option.onClick}
          isShowing={props.isShowing}
        />
      ))}
    </ListGroup>
  );
});

export default COptions;
