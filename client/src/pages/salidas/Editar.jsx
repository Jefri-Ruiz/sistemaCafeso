import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';
import SelectProductos from "../../components/consultas/SelectProductos";
import SelectClientes from "../../components/consultas/SelectClientes";

const Editar = ({ salida }) => {

    const [sku, setSku] = useState(salida.sku);
    const [idCliente, setIdCliente] = useState(salida.idcliente);
    const [fecha, setFecha] = useState(salida.fecha);
    const [hora, setHora] = useState(salida.hora);
    const [cantidad, setCantidad] = useState(salida.cantidad);
    const [precioPublico, setPrecioPublico] = useState(salida.preciopublico);
    const [descuento, setDescuento] = useState(salida.descuento);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Editar salida function
    const updateSalida = async (e) => {
        e.preventDefault();
        try {
            const body = { sku, idCliente, fecha, hora, cantidad, precioPublico, descuento };
            const response = await fetch(`http://localhost:5000/salidas/${salida.folio}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(response);
            handleClose();

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
                    <Modal.Title>Editar Salida</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="align-items-center">
                            <Form.Group as={Col} className="mb-3" controlId="formFolio">
                                <Form.Label>Folio</Form.Label>
                                <Form.Control type="text" disabled
                                    value={salida.folio}
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
                                            >#{producto.sku} | {producto.descripcion}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formIdCliente">
                            <Form.Label>ID Cliente</Form.Label>
                            <Form.Select aria-label="Default select example" value={idCliente} onChange={e => { setIdCliente(e.target.value) }} >
                                <option>Abrir para seleccionar</option>
                                {
                                    SelectClientes().map(cliente => (
                                        <option
                                            key={cliente.idcliente}
                                            value={cliente.idcliente}
                                        >#{cliente.idcliente} | Nombre: {cliente.nombre} {cliente.apellidopaterno} {cliente.apellidomaterno} | RFC: {cliente.rfc}</option>
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
                                <Form.Control type="number"
                                    value={cantidad}
                                    onChange={e => setCantidad(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formPrecioPublico">
                                <Form.Label>Precio Publico</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control type="number"
                                        value={precioPublico}
                                        onChange={e => setPrecioPublico(e.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>


                        </Row>
                        <Row className="align-items-center">
                            <Form.Group as={Col} className="mb-3" controlId="formDescuento">
                                <Form.Label>Descuento</Form.Label>
                                <InputGroup>
                                    <Form.Control type="number"
                                        value={descuento}
                                        onChange={e => setDescuento(e.target.value)}
                                    />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formMontoTotal">
                                <Form.Label>Monto Total</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control type="number"
                                        value={(cantidad * precioPublico) - (((cantidad * precioPublico) * descuento) / 100)}
                                        onChange={() => { return ((cantidad * precioPublico) - ((cantidad * precioPublico) * descuento) / 100) }}
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
                    <Button variant="primary" onClick={e => updateSalida(e)}>
                        Guardar cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Editar;