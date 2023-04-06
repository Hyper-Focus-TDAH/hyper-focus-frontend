import classes from "./Register.module.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";

import logo from "../assets/images/logo.png";

import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  function loginPage() {
    navigate("/login");
  }

  return (
    <div className={classes.container}>
      <Button className={classes.loginPage} onClick={loginPage}>
        LOGIN
      </Button>
      <Card>
        <Card.Header>
          <Figure>
            <Figure.Image src={logo} />
          </Figure>
        </Card.Header>
        <Card.Body className={classes.body}>
          <Card.Title className="mb-3">Register</Card.Title>
          <Form className={classes.form}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control type="name" placeholder="Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Control type="password" placeholder="Confirm password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              REGISTER
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Register;
