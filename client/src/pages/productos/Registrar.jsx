import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";

const Productos = () => {

    const [sku, setSku] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precioUnitario, setPrecioUnitario] = useState('');
    const [stockSistema, setStockSistema] = useState('');
    const precioIva = precioUnitario * 0.16;

    var precioPublico = parseFloat(precioUnitario) + parseFloat(precioIva);

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { sku, descripcion, precioUnitario, stockSistema };
            const respuesta = await fetch("http://localhost:5000/productos", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(body);
            console.log(respuesta);

            setSku("");
            setDescripcion("");
            setPrecioUnitario("");
            setStockSistema("");
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <div className="contenedor">
                <Form onSubmit={onSubmitForm}>

                    <Row className="align-items-center">
                        <Form.Group as={Col} className="mb-4" controlId="formSku">
                            <Form.Label>SKU</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                placeholder="Codigo del producto"
                                value={sku}
                                onChange={e => setSku(e.target.value)}
                            />

                        </Form.Group>

                        <Form.Group as={Col} className="mb-4" controlId="formStockSistema">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                placeholder="Cantidad"
                                value={stockSistema}
                                onChange={e => setStockSistema(e.target.value)}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="align-items-center">
                        <Form.Group as={Col} className="mb-4" controlId="formPrecioUnitario">
                            <Form.Label>Precio Unitario</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control
                                    autoComplete="off"
                                    type="text"
                                    placeholder="Precio"
                                    value={precioUnitario}
                                    onChange={e => setPrecioUnitario(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} xs={2} className="mb-4" controlId="formIva">
                            <Form.Label>IVA</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="number"
                                    placeholder="16"
                                />
                                <InputGroup.Text>%</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-4" controlId="formPrecioPublico">
                            <Form.Label>Precio al Publico</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control
                                    placeholder="Precio al Cliente"
                                    type="number"
                                    value={precioPublico}
                                    onChange={() => { return precioPublico }}
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-4" controlId="formValorAlmacen">
                            <Form.Label>Valor Total Almacen</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control
                                    type="number"
                                    placeholder="Costo real de Almacen"
                                    value={precioPublico * stockSistema}
                                    onChange={() => { return precioPublico * stockSistema }}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-4" controlId="formDescripcion">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control
                            autoComplete="off"
                            as="textarea"
                            row={4}
                            placeholder="Descripcion"
                            value={descripcion}
                            onChange={e => setDescripcion(e.target.value)}
                        />
                    </Form.Group>

                    <br />

                    <Button variant="primary" type="submit">
                        Agregar
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Productos