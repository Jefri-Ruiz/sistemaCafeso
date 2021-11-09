import React, { useState, useEffect } from 'react'
import { Table, Button } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa'
import EditarUsuario from '../../components/editar/EditarUsuario';

const ListarUsuarios = () => {

  const [usuarios, setUsuarios] = useState([])

  /* prueba delete usuario funciona*/

  const deleteUsuario = async matricula => {
    try {
      /* const deleteUsuario = */ await fetch(`http://localhost:5000/usuarios/${matricula}`, {
        method: "DELETE"
      });

      setUsuarios(usuarios.filter(usuario => usuario.matricula !== matricula));
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

  console.log(usuarios);

    return (
        <>
            
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
                    { usuarios.map( usuario =>(
                    <tr key={usuario.matricula}>
                      <td>{usuario.matricula}</td>
                      <td>{usuario.password}</td>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.apellidopaterno}</td>
                      <td>{usuario.apellidomaterno}</td>
                      
                      <td><EditarUsuario usuario={usuario}/></td>
                      <td><Button className="btn btn-danger" onClick={() => deleteUsuario(usuario.matricula)}><FaIcons.FaTrashAlt className="h-100 w-100"/></Button></td>
                    </tr>
                    ))}
                  </tbody>
                </Table>
    
        </>
    )
}

export default ListarUsuarios
