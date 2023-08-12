import React from "react";
import styles from "./header.module.css";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../redux/auth-action/auth-action";

const Header = () => {
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("userData");
  };
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link to="/">
            <div className={styles.logo}>Todo-List</div>
          </Link>
          <div className={styles.buttons}>
            {user.fullName ? (
              <>
                <Button onClick={logout} color="error" variant="contained">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth-sign-in">
                  <Button variant="contained">Войти</Button>
                </Link>
                <Link to="/auth-register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
