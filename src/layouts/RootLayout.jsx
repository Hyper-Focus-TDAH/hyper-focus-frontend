import classes from "./RootLayout.module.css";

import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import Logo from "../components/Logo"

function RootLayout() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  function switchPage() {
    isLogin ? navigate("/register") : navigate("/login");
    setIsLogin(!isLogin)
  }

  return (
    <div className={classes.root}>
      <Navbar className={classes.navbar} bg="light">
        <Logo />
        <Button onClick={switchPage}>{isLogin ? "REGISTER" : "LOGIN"}</Button>
      </Navbar>
      <Container className={classes.content}>
        <Outlet />
      </Container>
    </div>
  );
}

export default RootLayout;
