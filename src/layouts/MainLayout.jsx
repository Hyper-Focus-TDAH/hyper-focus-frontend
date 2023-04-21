import classes from "./MainLayout.module.css";

import { Outlet } from "react-router-dom";

import { Navbar, Container } from "react-bootstrap";

import Logo from '../components/navbar/Logo'

function MainLayout() {
  return (
    <div className={classes.root}>
      <Navbar className={classes.navbar} bg="light">
        <Logo redirectHome />
      </Navbar>
      <Container className={classes.content}>
        <Outlet />
      </Container>
    </div>
  );
}

export default MainLayout;
