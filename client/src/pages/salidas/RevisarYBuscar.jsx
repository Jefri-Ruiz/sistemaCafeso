import React, { useState, useEffect } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';
import Editar from './Editar';

const RevisarYBuscar = () => {

    const [salidas, setSalidas] = useState([]);
    const [buscar, setBuscar] = useState("");

    //Delete function
    const deleteSalida = async (folio) => {
        try {
            const request = await fetch(`http://localhost:5000/salidas/${folio}`, {
                method: "DELETE"
            });   
            console.log(request);
            setSalidas(salidas.filter(salida => salida.folio !== folio));
        } catch (err) {
            console.error(err.message);
        }
    }

    const getSalidas = async () => {
        try {
            const response = await fetch("http://localhost:5000/salidas");
            const jsonData = await response.json();
            setSalidas(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getSalidas();
    }, [])

    const filtroSalidas = salidas.filter(salida => (
        salida.folio.toUpperCase().includes(buscar.toUpperCase()) ||
        salida.fecha.includes(buscar)
    ));

    return (
        <>
            <div className="entradas__nav" >
                <Button variant="primary" onClick={getSalidas}>Refrescar</Button>
            </div>
            <Form>
                <Row className="align-items-center">
                    <Col className="mb-3">
                        <Form.Label>Buscar por Folio</Form.Label>
                        <Form.Group controlId="formBuscar">
                            <Form.Control type="text" placeholder="S001" onChange={e => setBuscar(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Col>
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
                        <th>Folio</th>
                        <th>SKU</th>
                        <th>ID Cliente</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Cantidad</th>
                        <th>Precio Publico</th>
                        <th>Descuento</th>
                        <th>Monto Total</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {filtroSalidas.map(salida => (
                        <tr key={salida.folio}>
                            <td>{salida.folio}</td>
                            <td>{salida.sku}</td>
                            <td>{salida.idcliente}</td>
                            <td>{salida.fecha}</td>
                            <td>{salida.hora}</td>
                            <td>{salida.cantidad}</td>
                            <td>$ {salida.preciopublico}</td>
                            <td>{salida.descuento} %</td>
                            <td>$ {salida.montototal}</td>
                            <td><Editar salida = {salida}/></td>
                            <td><Button className="btn btn-danger" onClick={() => deleteSalida(salida.folio)}><FaIcons.FaTrashAlt className="h-100 w-100" /></Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default RevisarYBuscar;