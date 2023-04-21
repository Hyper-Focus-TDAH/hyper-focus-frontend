import { ListGroup } from "react-bootstrap";
import { forwardRef } from "react";

import OptionsItem from "./OptionsItem";

const Options = forwardRef((props, ref) => {
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
        <OptionsItem
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

export default Options;
