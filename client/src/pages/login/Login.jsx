import React from "react";
import { Form, Button} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./login.scss";
import bolsa from "../../images/Bolsa.png";

const Login = () => {
  return (
    <>
      <div className="login">
        <div className="login__contenido">
        <div className="login__contenido__imagen">
          <img src={bolsa} alt="bolsa cafeso" />
        </div>
        <div className="login__contenido__datos">
          <div className="login__contenido__datos__titular">
            <h4>Bienvenido, empecemos a trabajar!</h4>
            <p>
            En caso de haber olvidado su contraseña solicite soporte al administrador.
            </p>
          </div>
          <div className="login__contenido__datos__form">
            <Form /* onSubmit={onSubmitForm} */ className="align-items-center">
              <Form.Group /* as={Col}*/ className="mb-4"  controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  autoComplete="off"
                  type="text"
                  placeholder="Ingrese nombre"
                  /* errorMessage = "El nombre del usuario debe tener entre 3 a 16 caracteres y no debe contener caracteres especiales!" */
                  pattern="^[A-Za-z]{3,16}$"
                  /* required={true}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)} */
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPass">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  autoComplete="off"
                  type="text"
                  placeholder="Tu contraseña"
                  pattern="^[A-Za-z0-9!@#$%^&*]{5,20}$" //^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$
                  /* required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)} */
                />
              </Form.Group>

              <br />
              <NavLink to="/" exact={true}>
                <Button variant="primary" /* type="submit" */>Login</Button>
              </NavLink>
            </Form>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Login;
