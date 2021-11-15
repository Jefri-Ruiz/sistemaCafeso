import React, { useState, useEffect } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';

const RevisarYBuscar = () => {

    const [inventario, setInventario] = useState([]);
    const [buscar, setBuscar] = useState("");

    const getInventario = async () => {
        try {
            const response = await fetch("http://localhost:5000/inventario");
            const jsonData = await response.json();
            setInventario(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getInventario();
    }, [])

    const filtroInventario = inventario.filter(inv => (
        inv.fecha.includes(buscar)
    ));

    return (
        <>
            <div className="entradas__nav" >
                <Button variant="primary" onClick={getInventario}>Refrescar</Button>
            </div>
            <Form>
                <Row className="align-items-center">
                    <Col className="mb-3">
                        <Form.Label>Buscar por fecha...</Form.Label>
                        <Form.Group controlId="formBuscar">
                            <Form.Control type="date" onChange={e => setBuscar(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID Inventario</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>SKU</th>
                        <th>Descripcion</th>
                        <th>Stock sistema</th>
                        <th>Stock fisico</th>
                        <th>Precio unitario</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {filtroInventario.map(inventario => (
                        <tr key={inventario.idinventario}>
                            <td>{inventario.idinventario}</td>
                            <td>{inventario.fecha}</td>
                            <td>{inventario.hora}</td>
                            <td>{inventario.sku}</td>
                            <td>{inventario.descripcion}</td>
                            <td>{inventario.stocksistema}</td>
                            <td>{inventario.stockfisico}</td>
                            <td>$ {inventario.preciounitario}</td>
                            <td><Button className="btn btn-primary"><FaIcons.FaEdit className="h-100 w-100" /></Button>{/* <EditarUsuario usuario={usuario}/> */}</td>
                            <td><Button className="btn btn-danger" /* onClick={borrarUsuario(usuario.matricula)} */><FaIcons.FaTrashAlt className="h-100 w-100" /></Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default RevisarYBuscar;