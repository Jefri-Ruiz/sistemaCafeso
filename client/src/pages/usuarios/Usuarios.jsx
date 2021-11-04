import React, { useState, useEffect } from 'react'
import { Table, Tabs, Tab, Form, Button } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa'
import EditarUsuario from '../../components/editar/EditarUsuario';

import "./usuarios.scss";

const Usuarios = () => {

    const [key, setKey] = useState('Registrar');

    /* agregar usuario */

    const [nombre, setNombre] = useState('');
    const [paterno, setPaterno] = useState('');
    const [materno, setMaterno] = useState('');
    const [pass, setPass] = useState('');

    const usuario = {
        pass,
        nombre,
        paterno,
        materno
    }
    
    const onSubmitForm = async(e) => {
      e.preventDefault();
      try {
      const body = {usuario};
      const respuesta =
      await fetch("http://localhost:5000/usuarios",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body: JSON.stringify(body)
        });
        console.log(respuesta);
      } catch (err){
      console.error(err.message);
    }
  }
  
  /* para listar los usuarios  */
  const [editUsuario, setEditUsuario] = useState([]);

  async function obtenerUsuario() {
    const res = await fetch("http://localhost:5000/usuarios");
    const usuariosArray = await res.json();
    setEditUsuario(usuariosArray) 
  }

  useEffect(() => {
      obtenerUsuario();
  }, []);
  console.log(editUsuario);


  /* para eliminar usuario  */
  const [eliminarUsuario, setEliminarUsuario] = useState([]);
  async function borrarUsuario(matricula) {
    try {
      const res = await fetch(`http://localhost:5000/usuarios/${matricula}`,{
        method: 'DELETE'
      });
      setEliminarUsuario(eliminarUsuario.filter(usuario => usuario.matricula !== matricula));
      
    } catch (err) {
      console.error(err.message)
    }
  }

    
    return (
        <>
        <div className="usuarios">
          <div className="container">
            <div className="usuarios__titulo">
              <h2>Usuarios</h2>
            </div>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-2 w-100"
              style={{textDecoration:"none"}}
            >

              <Tab eventKey="Registrar" title="Registrar">
  
              <div className="contenedor">
              <Form onSubmit={onSubmitForm}>
                  
                      <Form.Group className="mb-4" controlId="formNombre">
                          {/* <Form.Label>Nombre</Form.Label> */}
                          <Form.Control
                            autoComplete="off" 
                            type="text"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                          />
                      </Form.Group>

                      <Form.Group className="mb-4" controlId="formPaterno">
                          <Form.Control
                            autoComplete="off" 
                            type="text"
                            placeholder="Apellido paterno"
                            value={paterno}
                            onChange={e => setPaterno(e.target.value)}
                          />
                      </Form.Group>

                      <Form.Group className="mb-4" controlId="formMaterno">
                          <Form.Control
                            autoComplete="off" 
                            type="text"
                            placeholder="Apellido materno"
                            value={materno}
                            onChange={e => setMaterno(e.target.value)}
                          />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formPass">
                          <Form.Control
                            autoComplete="off" 
                            type="password"
                            placeholder="Password"
                            value={pass}
                            onChange={e => setPass(e.target.value)}
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
  
              </Tab>
  
              <Tab eventKey="Revisar y buscar" title="Revisar y buscar">
  
              <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Matricula</th>
                      <th>Password</th>
                      <th>Nombre</th>
                      <th>Apellido paterno</th>
                      <th>Apellido materno</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    { editUsuario.map( usuario =>(
                    <tr key={usuario.matricula}>
                      <td>{usuario.matricula}</td>
                      <td>{usuario.password}</td>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.apellidopaterno}</td>
                      <td>{usuario.apellidomaterno}</td>
                      <td><Button className="btn btn-primary"><FaIcons.FaEdit className="h-100 w-100"/></Button>{/* <EditarUsuario usuario={usuario}/> */}</td>
                      <td><Button className="btn btn-danger" /* onClick={borrarUsuario(usuario.matricula)} */><FaIcons.FaTrashAlt className="h-100 w-100"/></Button></td>
                    </tr>
                    ))}
                  </tbody>
                </Table>
  
              </Tab>
  
            </Tabs>
          </div>
        </div>
      </>
    )
}

export default Usuarios
