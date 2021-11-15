import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

const RegistrarUsuarios = () => {
  /*   const [datos, setDatos] = useState({
    password: '',
    nombre: '',
    apellidopaterno: '',
    apellidomaterno: ''
}) */

  /*   const handleInputChange = (event) => {
  // console.log(event.target.name)
  // console.log(event.target.value) 
  setDatos({
    ...datos,
    [event.target.name] : event.target.value
  })
} */
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidopaterno, setApellidopaterno] = useState("");
  const [apellidomaterno, setApellidomaterno] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      /* console.log(datos); */
      const body = { password, nombre, apellidopaterno, apellidomaterno };
      const response = await fetch("http://localhost:5000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // Para resetear todo cada
      setNombre("");
      setApellidopaterno("");
      setApellidomaterno("");
      setPassword("");

      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="contenedor">
        {/* <div className="contenedor__titulo">
          <h2>Ingrese aquí la información</h2>
        </div> */}
        <Form onSubmit={onSubmitForm}>
          
          <Row className="align-items-center">

          <Form.Group as={Col} className="mb-4" controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Albert"
              /* errorMessage = "El nombre del usuario debe tener entre 3 a 16 caracteres y no debe contener caracteres especiales!" */
              pattern= "^[A-Za-z]{3,16}$"
              required= {true}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group as={Col} className="mb-4" controlId="formPaterno">
          <Form.Label>Apellido paterno</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Einstein"
              pattern= "^[A-Za-z]{3,20}$"
              required= {true}
              value={apellidopaterno}
              onChange={(e) => setApellidopaterno(e.target.value)}
            />
          </Form.Group>

          </Row>

          <Row className="align-items-center justify-center">
            
          <Form.Group as={Col} className="mb-4" controlId="formMaterno">
          <Form.Label>Apellido materno</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Perez"
              pattern= "^[A-Za-z]{3,16}$"
              required= {true}
              value={apellidomaterno}
              onChange={(e) => setApellidomaterno(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} className="mb-4" controlId="formPass">
          <Form.Label>Contraseña</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Tu contraseña"
              pattern= "^[A-Za-z0-9!@#$%^&*]{5,20}$" //^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$
              required= {true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <Form.Text className="text-muted">
              Asegurese ingresar una contraseña con minimo cinco caracteres
            </Form.Text> */}
          </Form.Group>
          </Row>

          <br />

          <Button variant="primary" type="submit">
            Agregar
          </Button>
        </Form>
      </div>
    </>
  );
};

export default RegistrarUsuarios;
