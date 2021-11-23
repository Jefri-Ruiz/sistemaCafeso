import React from "react";
import { Form, Button, Col} from "react-bootstrap";
import "./login.scss";

const Login = () => {
  return (
    <>
      <div className="login">
        <div className="login__titulo">
          <h2>Ingrese aquí la información</h2>
        </div>
        <div className="login__form">
        <Form /* onSubmit={onSubmitForm} */ className="align-items-center">
            <Form.Group as={Col} className="mb-4" controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                autoComplete="off"
                type="text"
                placeholder="Albert"
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
            <Form.Text className="text-muted">
              Asegurese ingresar una contraseña con minimo cinco caracteres
            </Form.Text>
          </Form.Group>

          <br />

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
