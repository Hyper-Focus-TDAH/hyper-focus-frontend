import classes from "./Login.module.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";

import logo from "../assets/images/logo.png";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  function registerPage () {
    navigate("/register")
  }

  return (
    <div className={classes.container}>
      <Button className={classes.registerPage} onClick={registerPage} >REGISTER</Button>
      <Card>
        <Card.Header>
          <Figure>
            <Figure.Image src={logo} />
          </Figure>
        </Card.Header>
        <Card.Body className={classes.body}>
          <Card.Title className="mb-3">Login</Card.Title>
          <Form className={classes.form}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              LOGIN
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
