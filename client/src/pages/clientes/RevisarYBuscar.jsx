import React, { useState, useEffect } from 'react'
import { Table, Button, Form, Row, Col, InputGroup} from "react-bootstrap";
import EditarCliente from './EditarCliente';
import * as FaIcons from 'react-icons/fa'

const RevisarYBuscar = () => {

    const [clientes, setClientes] = useState([]);
    const [buscar, setBuscar] = useState("");

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

    const filtroClientes = clientes.filter(cliente => (
        cliente.nombre.toUpperCase().includes(buscar.toUpperCase())
    ));

    console.log(clientes);

    return (
        <>
                <Form>
                <Form.Label></Form.Label>
                <Row className="align-items-center">

                    <Form.Group as={Col} xs={11} className="mb-0" controlId="formBuscar">
                        <InputGroup className="mb-0">
                            <InputGroup.Text>Buscar por:</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Nombre de la persona"
                                onChange={e => setBuscar(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Button as={Col} xs="auto" onClick={getClientes}>Refrescar</Button>
                </Row>
            </Form>





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
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filtroClientes.map(cliente => (
                        <tr key={cliente.idcliente}>
                            <td>{cliente.idcliente}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.correo}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.apellidopaterno}</td>
                            <td>{cliente.apellidomaterno}</td>
                            <td>{cliente.rfc}</td>

                            <td className="d-flex justify-content-around align-items-center">
                                <EditarCliente cliente={cliente} getClientes={getClientes} />
                                <Button
                                    className="btn btn-danger"
                                    onClick={() => borrarCliente(cliente.idcliente)}
                                >
                                    <FaIcons.FaTrashAlt className="h-100 w-100" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default RevisarYBuscar