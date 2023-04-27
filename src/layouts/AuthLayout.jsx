import classes from "./AuthLayout.module.css";

import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { Container, Navbar, Button } from "react-bootstrap";

import Logo from "../components/navbar/Logo";
import RouteNames from "../router/RouteNames";

import { t } from "../i18n/translate";

function AuthLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  function switchNavLoginRegister() {
    location.pathname === RouteNames.LOGIN ? navigate(RouteNames.REGISTER) : navigate(RouteNames.LOGIN);
  }

  return (
    <div className={classes.root}>
      <Navbar className={classes.navbar} bg="light">
        <Logo redirectHome />
        <Button onClick={switchNavLoginRegister}>
          {location.pathname === RouteNames.LOGIN ? t("REGISTER") : t("LOGIN")}
        </Button>
      </Navbar>
      <Container className={classes.content}>
        <Outlet />
      </Container>
    </div>
  );
}

export default AuthLayout;
