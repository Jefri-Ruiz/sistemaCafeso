import React, { useState, useEffect } from "react";
import { Table, Button} from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import EditarUsuario from "./EditarUsuario";

const RevisarYBuscar = () => {
  const [usuarios, setUsuarios] = useState([]);
 /*  const [buscar, setBuscar] = useState(""); */

  /* prueba delete usuario funciona*/

  const deleteUsuario = async (matricula) => {
    try {
      /* const deleteUsuario = */ await fetch(
        `http://localhost:5000/usuarios/${matricula}`,
        {
          method: "DELETE",
        }
      );

      setUsuarios(
        usuarios.filter((usuario) => usuario.matricula !== matricula)
      );
      alert("El usuario será eliminado")
    } catch (err) {
      console.error(err.message);
    }
  };

  /* prueba get usuarios funciona*/
  const getUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:5000/usuarios");
      const jsonData = await response.json();

      setUsuarios(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  /* const filtroClientes = usuarios.filter((usuario) =>
    usuario.nombre.toUpperCase().includes(buscar.toUpperCase())
  ); */

  console.log(usuarios);

  return (
    <>
    <div className="usuarios__nav">
      {/* <Form>
        <Row className="align-items-center">
          <Col className="mb-3">
            <Form.Group
              as={Col}
              xs={11}
              className="mb-0"
              controlId="formBuscar"
            >
              <InputGroup className="mb-0">
                <InputGroup.Text>Buscar por:</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Nombre del usuario"
                  onChange={(e) => setBuscar(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
      </Form> */}
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Matricula</th>

            <th>Tipo de usuario</th>
            <th>Nombre</th>
            <th>Apellido paterno</th>
            <th>Apellido materno</th>
            <th>Password</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.matricula}>
              <td>{usuario.matricula}</td>
              <td>{usuario.tipousuario}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellidopaterno}</td>
              <td>{usuario.apellidomaterno}</td>
              <td>{usuario.password}</td>


              <td className="d-flex justify-content-around align-items-center">
                <EditarUsuario usuario={usuario} getUsuarios={getUsuarios}/>
                <Button
                  className="btn btn-danger"
                  onClick={() => deleteUsuario(usuario.matricula)}
                >
                  <FaIcons.FaTrashAlt className="h-100 w-100" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default RevisarYBuscar;
