import React, { useState, useEffect } from 'react'
import { Table, Button } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa'

const RevisarYBuscar = () => {

    const [clientes, setClientes] = useState([]);

    const getClientes = async () => {
        try {
            const response = await fetch("http://localhost:5000/clientes");
            const jsonData = await response.json();
            setClientes(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const borrarCliente = async idcliente => {
        try {
            await fetch(`http://localhost:5000/clientes/${idcliente}`, {
                method: "DELETE"
            });
            setClientes(clientes.filter(clientes => clientes.idcliente !== idcliente));
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getClientes();
    }, [])

    console.log(clientes);


    return (
        <>
            <Button onClick={getClientes}>Refrescar</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>RFC</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.idcliente}>
                            <td>{cliente.idcliente}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.correo}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.apellidopaterno}</td>
                            <td>{cliente.apellidomaterno}</td>
                            <td>{cliente.rfc}</td>
                            <td><Button className="btn btn-primary"><FaIcons.FaEdit className="h-100 w-100" /></Button>{/* <EditarCliente cliente={cliente}/> */}</td>
                            <td><Button className="btn btn-danger" onClick={() => borrarCliente(cliente.idcliente)}><FaIcons.FaTrashAlt className="h-100 w-100" /></Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default RevisarYBuscar