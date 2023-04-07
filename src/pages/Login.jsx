import classes from "./Login.module.css";

import { useNavigate, Form as RouterForm } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";

import logo from "../assets/images/logo.png";

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
          <RouterForm method="post" className={classes.form}>
            <Form.Group className="mb-3">
              <Form.Control name="email" type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control name="password" type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              LOGIN
            </Button>
          </RouterForm>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);
  console.log(postData);
  return null;
}
