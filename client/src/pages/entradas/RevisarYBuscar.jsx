import React, { useState, useEffect } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';
import Editar from './Editar';

const RevisarYBuscar = () => {

    const [entradas, setEntradas] = useState([]);
    const [buscar, setBuscar] = useState("");

    //Delete function
    const deleteEntrada = async (folio) => {
        try {
            const request = await fetch(`http://localhost:5000/entradas/${folio}`, {
                method: "DELETE"
            });   
            console.log(request);
            setEntradas(entradas.filter(entrada => entrada.folio !== folio));
        } catch (err) {
            console.error(err.message);
        }
    }

    //Get function
    const getEntradas = async () => {

        try {
            const response = await fetch("http://localhost:5000/entradas");
            const jsonData = await response.json();
            setEntradas(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getEntradas();
    }, [])

    const filtroEntradas = entradas.filter(entrada => (
        entrada.folio.toUpperCase().includes(buscar.toUpperCase()) ||
        entrada.fecha.includes(buscar)
    ));

    return (
        <>
            <div className="entradas__nav" >
                <Button variant="primary" onClick={getEntradas}>Refrescar</Button>
            </div>
            <Form>
                <Row className="align-items-center">
                    <Col className="mb-3">
                        <Form.Label>Buscar por Folio</Form.Label>
                        <Form.Group controlId="formBuscar">
                            <Form.Control type="text" placeholder="E001" onChange={e => setBuscar(e.target.value)}></Form.Control>
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
                        <th>ID Proveedor</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Cantidad</th>
                        <th>Costo Unitario</th>
                        <th>Costo Total</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {filtroEntradas.map(entrada => (
                        <tr key={entrada.folio}>
                            <td>{entrada.folio}</td>
                            <td>{entrada.sku}</td>
                            <td>{entrada.idproveedor}</td>
                            <td>{entrada.fecha}</td>
                            <td>{entrada.hora}</td>
                            <td>{entrada.cantidad}</td>
                            <td>$ {entrada.costounitario}</td>
                            <td>$ {entrada.costototal}</td>
                            <td><Editar entrada = {entrada}/></td>
                            <td><Button className="btn btn-danger" onClick={() => deleteEntrada(entrada.folio)}><FaIcons.FaTrashAlt className="h-100 w-100" /></Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default RevisarYBuscar;