import React, { useState, useEffect } from "react";
import { Table, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';
import Editar from './Editar';
import { CSVLink } from "react-csv";
import DocumentPdf from "./DocumentPdf";
import { PDFDownloadLink } from '@react-pdf/renderer'

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
            <div className="entradas__nav">
                <Form>
                    <Row className="align-items-center">
                        <Col className="mb-3">
                            <Form.Group controlId="formBuscar">
                                <InputGroup className="mb-0">
                                    <InputGroup.Text>Buscar por:</InputGroup.Text>
                                    <Form.Control type="text"
                                        placeholder="Folio"
                                        onChange={e => setBuscar(e.target.value)}>
                                    </Form.Control>
                                </InputGroup>
                            </Form.Group>
                        </Col>
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
                            <Button variant="primary" style={{ marginRight: 20 }}
                                onClick={getEntradas} >
                                <FaIcons.FaSync className="h-100 w-100" />
                            </Button>

                            <PDFDownloadLink
                                document={<DocumentPdf entradas={filtroEntradas} />}
                                filename="eentradas.pdf"
                            >
                                <Button variant="secondary" style={{ marginRight: 20 }}>
                                    PDF  <FaIcons.FaDownload className="h-150 w-150" />
                                </Button>
                            </PDFDownloadLink>

                            <CSVLink
                                data={filtroEntradas}
                                filename={"entradas.csv"}
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
                        <th>Folio</th>
                        <th>SKU</th>
                        <th>ID Proveedor</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Cantidad</th>
                        <th>Costo Unitario</th>
                        <th>Costo Total</th>
                        <th>Acciones</th>
                    </tr >
                </thead >
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
                            <td className="d-flex justify-content-around align-items-center">
                                <Editar entrada={entrada} />
                                <Button className="btn btn-danger" onClick={() => deleteEntrada(entrada.folio)}>
                                    <FaIcons.FaTrashAlt className="h-100 w-100" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table >
        </>)
};

export default RevisarYBuscar;