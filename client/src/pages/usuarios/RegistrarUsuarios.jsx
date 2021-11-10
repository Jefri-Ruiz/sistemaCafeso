import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

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
          {/* <Form.Label>Nombre</Form.Label> */}
          <Form.Group className="mb-4" controlId="formNombre">
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formPaterno">
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Apellido paterno"
              value={apellidopaterno}
              onChange={(e) => setApellidopaterno(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formMaterno">
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Apellido materno"
              value={apellidomaterno}
              onChange={(e) => setApellidomaterno(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPass">
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text className="text-muted">
              Asegurese ingresar correctamente la contraseña
            </Form.Text>
          </Form.Group>

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
