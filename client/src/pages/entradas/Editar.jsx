import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {Form, Button, Row, Col, InputGroup} from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';
import SelectProductos from "../../components/consultas/SelectProductos";
import SelectProveedor from "../../components/consultas/SelectProveedor";

const Editar = ({ entrada, getEntradas }) => {

    const [sku, setSku] = useState(entrada.sku);
    const [idProveedor, setIdProveedor] = useState(entrada.idproveedor);
    const [fecha, setFecha] = useState(entrada.fecha);
    const [hora, setHora] = useState(entrada.hora);
    const [cantidad, setCantidad] = useState(entrada.cantidad);
    const [costoUnitario, setCostoUnitario] = useState(entrada.costounitario);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Editar entrada function
    const updateEntrada = async (e) => {
        e.preventDefault();
        try {
            const body = { sku, idProveedor, fecha, hora, cantidad, costoUnitario };
            const response = await fetch(`http://localhost:5000/entradas/${entrada.folio}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(response);
            handleClose();
            getEntradas();
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <FaIcons.FaEdit className="h-100 w-100" />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Entrada</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="align-items-center">
                            <Form.Group as={Col} className="mb-3" controlId="formFolio">
                                <Form.Label>Folio</Form.Label>
                                <Form.Control type="text" disabled
                                    value={entrada.folio}
                                />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formNumSku">
                                <Form.Label>SKU</Form.Label>
                                <Form.Select aria-label="Default select example" value={sku} onChange={e => { setSku(e.target.value) }} >
                                    <option>Abrir para seleccionar</option>
                                    {
                                        SelectProductos().map(producto => (
                                            <option
                                                key={producto.sku}
                                                value={producto.sku}
                                            >#{producto.sku} | {producto.descripcion} </option>
                                        ))
                                    }

                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formIdProveedor">
                            <Form.Label>ID Proveedor</Form.Label>
                            <Form.Select aria-label="Default select example" value={idProveedor} onChange={e => { setIdProveedor(e.target.value) }} >
                                <option>Abrir para seleccionar</option>
                                {
                                    SelectProveedor().map(proveedor => (
                                        <option
                                            key={proveedor.idproveedor}
                                            value={proveedor.idproveedor}
                                        >#{proveedor.idproveedor} | {proveedor.razonsocial} </option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Row className="align-items-center">
                            <Form.Group as={Col} className="mb-3" controlId="formFecha">
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control type="date"
                                    value={fecha}
                                    onChange={e => setFecha(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formHora">
                                <Form.Label>Hora</Form.Label>
                                <Form.Control type="time"
                                    value={hora}
                                    onChange={e => setHora(e.target.value)}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="align-items-center">
                            <Form.Group as={Col} className="mb-3" controlId="formCantidad">
                                <Form.Label>Cantidad</Form.Label>
                                <Form.Control type="number" placeholder="1"
                                    value={cantidad}
                                    onChange={e => setCantidad(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formCostoUnitario">
                                <Form.Label>Costo unitario</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control type="number" placeholder="0.01"
                                        value={costoUnitario}
                                        onChange={e => setCostoUnitario(e.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formCostoTotal">
                                <Form.Label>Costo Total</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control type="number"
                                        value={cantidad * costoUnitario}
                                        onChange={() => { return cantidad * costoUnitario }}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={e => updateEntrada(e)}>
                        Guardar cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Editar;