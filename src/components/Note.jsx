import { forwardRef, useState } from "react";

import {
  Card,
  CloseButton,
  Popover,
  ListGroup,
  OverlayTrigger,
} from "react-bootstrap";

import { BsThreeDotsVertical } from "react-icons/bs";
import IconButton from "./IconButton";

const options = [
  { name: "opt1" },
  { name: "opt2" },
  {
    name: "opt3",
    options: [
      { name: "opt3.1" },
      { name: "opt3.2", options: [{ name: "opt3.2.3" }] },
    ],
  },
  { name: "opt4" },
];

const PopoverTest = forwardRef((props, ref) => {
  const [isShowing, setIsShowing] = useState(false);

  function handleMouseLeave() {
    setIsShowing(false);
  }

  function handleMouseEnter() {
    setIsShowing(true);
  }

  return (
    <ListGroup
      ref={ref}
      {...props}
      variant="flush"
      onMouseLeave={props.onMouseLeave}
    >
      {props.options.map((option) => (
        <div key={option.name}>
          {option.options ? (
            <OverlayTrigger
              show={isShowing}
              placement="right"
              overlay={
                <PopoverTest
                  options={option.options}
                  onMouseLeave={handleMouseLeave}
                />
              }
            >
              <ListGroup.Item onMouseEnter={handleMouseEnter}>
                {option.name}
              </ListGroup.Item>
            </OverlayTrigger>
          ) : (
            <ListGroup.Item>{option.name}</ListGroup.Item>
          )}
        </div>
      ))}
    </ListGroup>
  );
});

function Note({ id, text, color, remove }) {
  const [isShowing, setIsShowing] = useState(false);

  function handleMouseLeave() {
    setIsShowing(false);
  }

  function handleOptionsClick() {
    setIsShowing(true);
  }

  return (
    <Card
      bg={color}
      className="m-1"
      key={id}
      style={{ backgroundColor: color, minWidth: "150px", maxWidth: "300px" }}
    >
      <Card.Header
        style={{ padding: "10px" }}
        className="d-flex justify-content-between align-items-center"
      >
        <div>
          {/* <OverlayTrigger
            show={isShowing}
            trigger="click"
            placement="bottom"
            overlay={
              <PopoverTest options={options} onMouseLeave={handleMouseLeave} />
            }
          >
            <IconButton
              icon={<BsThreeDotsVertical />}
              size="22px"
              padding="0px"
              onClick={handleOptionsClick}
            />
          </OverlayTrigger> */}
        </div>
        <CloseButton onClick={() => remove(id)} />
      </Card.Header>
      <Card.Body style={{ padding: "10px" }}>{text}</Card.Body>
    </Card>
  );
}

export default Note;
