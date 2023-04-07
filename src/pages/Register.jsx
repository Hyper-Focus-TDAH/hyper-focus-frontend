import classes from "./Register.module.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";

import logo from "../assets/images/logo.png";

import { useNavigate, Form as RouterForm } from "react-router-dom";

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
          <RouterForm method="post" className={classes.form}>
            <Form.Group className="mb-3">
              <Form.Control name="name" type="name" placeholder="Name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control name="email" type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control name="password" type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control name="confirmPassword" type="password" placeholder="Confirm password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              REGISTER
            </Button>
          </RouterForm>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Register;

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);
  console.log(postData);
  return null;
}
