import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';
import SelectProductos from "../../components/consultas/SelectProductos";

const Editar = ({ inventario }) => {

    const [fecha, setFecha] = useState(inventario.fecha);
    const [hora, setHora] = useState(inventario.hora);
    const [sku, setSku] = useState(inventario.sku);
    const [descripcion, setDescripcion] = useState(inventario.descripcion);
    const [stockSistema, setStockSistema] = useState(inventario.stocksistema);
    const [stockFisico, setStockFisico] = useState(inventario.stockfisico);
    const [precioUnitario, setPrecioUnitario] = useState(inventario.preciounitario);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Editar inventario function
    const updateInventario = async (e) => {
        e.preventDefault();
        try {
            const body = { fecha, hora, sku, descripcion, stockSistema, stockFisico, precioUnitario };
            const response = await fetch(`http://localhost:5000/inventario/${inventario.idinventario}`, {
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
                    <Modal.Title>Editar Inventario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="align-items-center">
                            <Form.Group as={Col} className="mb-3" controlId="formIdInventario">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="number" disabled
                                    value={inventario.idinventario}
                                />
                            </Form.Group>
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
                            <Form.Group as={Col} className="mb-3" controlId="formSku">
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
                        <Row className="align-items-center">
                            <Form.Group as={Col} className="mb-3" controlId="formDescripcion">
                                <Form.Label>Descripcion</Form.Label>
                                <Form.Control type="text" placeholder="Descripcion"
                                    value={descripcion}
                                    onChange={e => setDescripcion(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="align-items-center">
                            <Form.Group as={Col} className="mb-3" controlId="formStockSistema">
                                <Form.Label>Stock sistema</Form.Label>
                                <Form.Control type="number" placeholder="0"
                                    value={stockSistema}
                                    onChange={e => setStockSistema(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formStockFisico">
                                <Form.Label>Stock Fisico</Form.Label>
                                <InputGroup>
                                    <Form.Control type="number" placeholder="0"
                                        value={stockFisico}
                                        onChange={e => setStockFisico(e.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formPrecioUnitario">
                                <Form.Label>Precio Unitario</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control type="number" placeholder="0.00"
                                        value={precioUnitario}
                                        onChange={e => setPrecioUnitario(e.target.value)}
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
                    <Button variant="primary" onClick={e => updateInventario(e)}>
                        Guardar cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Editar;