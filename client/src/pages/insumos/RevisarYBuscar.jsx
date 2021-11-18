import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import EditarInsumo from './EditarInsumo';
import * as FaIcons from 'react-icons/fa'

const RevisarYBuscar = () => {

    const [insumos, setInsumos] = useState([]);
    const [buscar, setBuscar] = useState("");

    const getInsumos = async () => {
        try {
            const response = await fetch("http://localhost:5000/insumos");
            const jsonData = await response.json();
            setInsumos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const borrarInsumos = async sku => {
        try {
            await fetch(`http://localhost:5000/insumos/${sku}`, {
                method: "DELETE"
            });
            setInsumos(insumos.filter(insumos => insumos.sku !== sku));
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getInsumos();
    }, [])
    
    const filtroInsumos = insumos.filter(insumo => (
        insumo.descripcion.toUpperCase().includes(buscar.toUpperCase())
    ));

    console.log(insumos);

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
                                placeholder="Descripcion del insumo"
                                onChange={e => setBuscar(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Button as={Col} xs="auto" onClick={getInsumos}>Refrescar</Button>
                </Row>
            </Form>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th>Descripcion</th>
                        <th>Costo Unitario</th>
                        <th>Unidad de medida</th>
                        <th>Stock en Sistema</th>
                        <th>Valor del Almacen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filtroInsumos.map(insumo => (
                        <tr key={insumo.sku}>
                            <td>{insumo.sku}</td>
                            <td>{insumo.descripcion}</td>
                            <td>${insumo.costounitario}</td>
                            <td>{insumo.unidadmedida}</td>
                            <td>{insumo.stocksistema}</td>
                            <td>${insumo.valoralmacen}</td>

                            <td className="d-flex justify-content-around align-items-center">
                                <EditarInsumo insumo={insumo} getInsumos={getInsumos} />
                                <Button
                                    className="btn btn-danger"
                                    onClick={() => borrarInsumos(insumo.sku)}
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
