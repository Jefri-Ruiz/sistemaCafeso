import React, { useState, useEffect } from "react";
import { Table, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';
import Editar from './Editar';
import { CSVLink } from "react-csv";
import DocumentPdf from "./reportPdf/DocumentPdf";
import { PDFDownloadLink } from '@react-pdf/renderer';

const RevisarYBuscar = () => {
    const [inventario, setInventario] = useState([]);
    const [buscar, setBuscar] = useState("");

    //Delete function
    const deleteInventario = async (idInventario) => {
        try {
            const request = await fetch(`http://localhost:5000/inventario/${idInventario}`, {
                method: "DELETE"
            });
            console.log(request);
            getInventario();
        } catch (err) {
            console.error(err.message);
        }
    };

    //Get a Inventario
    const getInventario = async () => {
        try {
            const response = await fetch("http://localhost:5000/inventario");
            const jsonData = await response.json();
            setInventario(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getInventario();
    }, [])

    const filtroInventario = inventario.filter(inv => (
        inv.fecha.includes(buscar)
    ));

    return (
        <>
            <div className="inventario__nav" >
                <Form>
                    <Row className="align-items-center">
                        <Col className="mb-3">
                            <Form.Group controlId="formBuscar">
                                <InputGroup className="mb-0">
                                    <InputGroup.Text>Buscar por fecha:</InputGroup.Text>
                                    <Form.Control type="date"
                                        onChange={e => setBuscar(e.target.value)}>
                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                        </Col>

                        <Col className="mb-3">
                            <PDFDownloadLink
                                document={<DocumentPdf inventario={filtroInventario} />}
                                filename="inventario.pdf"
                            >
                                <Button variant="secondary" style={{ marginRight: 20 }}>
                                    PDF  <FaIcons.FaDownload className="h-150 w-150" />
                                </Button>
                            </PDFDownloadLink>

                            <CSVLink
                                data={filtroInventario}
                                filename={"inventario.csv"}
                            >
                                <Button variant="secondary">
                                    CSV  <FaIcons.FaDownload className="h-150 w-150" />
                                </Button>
                            </CSVLink>
                        </Col>
                    </Row>
                </Form>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>SKU</th>
                        <th>Descripcion</th>
                        <th>Stock sistema</th>
                        <th>Stock fisico</th>
                        <th>Precio unitario</th>
                        <th>Acciones</th>
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
                            <td className="d-flex justify-content-around align-items-center">
                                <Editar inventario={inventario} getInventario={getInventario} />
                                <Button className="btn btn-danger" onClick={() => deleteInventario(inventario.idinventario)}>
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

export default RevisarYBuscar;