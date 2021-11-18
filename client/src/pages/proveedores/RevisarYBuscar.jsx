import React, { useState, useEffect } from 'react'
import { Table, Button, Form, Col, Row, InputGroup } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';
import EditarProveedor from './EditarProveedor';

const RevisarYBuscar = () => {

    const [proveedores, setProveedores] = useState([]);
    const [buscar, setBuscar] = useState("");

    const getProveedores = async () => {
        try {
            const response = await fetch("http://localhost:5000/proveedores");
            const jsonData = await response.json();
            setProveedores(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const borrarProveedor = async idproveedor => {
        try {
            await fetch(`http://localhost:5000/proveedores/${idproveedor}`, {
                method: "DELETE"
            });
            setProveedores(proveedores.filter(proveedores => proveedores.idproveedor !== idproveedor));
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getProveedores();
    }, [])

    const filtroProveedores = proveedores.filter(proveedor => (
        proveedor.razonsocial.toUpperCase().includes(buscar.toUpperCase())
    ));

    console.log(proveedores);

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
                                placeholder="Razon Social"
                                onChange={e => setBuscar(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Button as={Col} xs="auto" onClick={getProveedores}>Refrescar</Button>
                </Row>
            </Form>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Razon Social</th>
                        <th>RFC</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                        <th>Direccion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filtroProveedores.map(proveedor => (
                        <tr key={proveedor.idproveedor}>
                            <td>{proveedor.idproveedor}</td>
                            <td>{proveedor.razonsocial}</td>
                            <td>{proveedor.rfc}</td>
                            <td>{proveedor.telefono}</td>
                            <td>{proveedor.correo}</td>
                            <td>{proveedor.direccion}</td>

                            <td className="d-flex justify-content-around align-items-center">
                                <EditarProveedor proveedor={proveedor} getProveedores={getProveedores} />
                                <Button
                                    className="btn btn-danger"
                                    onClick={() => borrarProveedor(proveedor.idproveedor)}
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