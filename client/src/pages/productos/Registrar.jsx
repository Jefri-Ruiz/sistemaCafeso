import React, { useState } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";

const Productos = () => {

    const [sku, setSku] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precioUnitario, setPrecioUnitario] = useState("");
    const [stockSistema, setStockSistema] = useState("");
    const [iva, setIva] = useState("");

    //const precioIva = precioUnitario * 0.16;
    //const precioPublico = parseFloat(precioUnitario) + parseFloat(precioIva);

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { sku, descripcion, precioUnitario, stockSistema, iva };
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
            setIva("");
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
                                type="number"
                                placeholder="1"
                                value={sku}
                                onChange={e => setSku(e.target.value)}
                                required={true}
                            />

                        </Form.Group>

                        <Form.Group as={Col} className="mb-4" controlId="formStockSistema">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="number"
                                placeholder="0"
                                value={stockSistema}
                                onChange={e => setStockSistema(e.target.value)}
                                required={true}
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
                                    type="number"
                                    placeholder="0.00"
                                    value={precioUnitario}
                                    onChange={e => setPrecioUnitario(e.target.value)}
                                    pattern="[0-9]{10}$"
                                    required={true}
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-4" controlId="formIva">
                            <Form.Label>IVA</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="number"
                                    placeholder="16"
                                    value={iva}
                                    onChange={e => setIva(e.target.value)}
                                />
                                <InputGroup.Text>%</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-4" controlId="formPrecioPublico">
                            <Form.Label>Precio al Publico</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control
                                    type="number"
                                    placeholder="0.00"
                                    value={(precioUnitario + ((precioUnitario * iva) / 100))}
                                    onChange={() => { return (precioUnitario + ((precioUnitario * iva) / 100)) }}
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-4" controlId="formValorAlmacen">
                            <Form.Label>Valor Total Almacen</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control
                                    type="number"
                                    placeholder="0.00"
                                    value={stockSistema * (precioUnitario + ((precioUnitario * iva) / 100))}
                                    onChange={() => {return (stockSistema * (precioUnitario + ((precioUnitario * iva) / 100))) }}
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
                            required={true}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Agregar
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Productos;