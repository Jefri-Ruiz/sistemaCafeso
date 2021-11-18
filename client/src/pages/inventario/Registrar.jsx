import React, { useState } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import SelectProductos from "../../components/consultas/SelectProductos";

const Registrar = () => {

    const [idInventario, setIdInventario] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [sku, setSku] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [stockSistema, setStockSistema] = useState("");
    const [stockFisico, setStockFisico] = useState("");
    const [precioUnitario, setPrecioUnitario] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {

            const body = { idInventario, fecha, hora, sku, descripcion, stockSistema, stockFisico, precioUnitario };
            const response = await fetch("http://localhost:5000/inventario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(response);
            setIdInventario("");
            setFecha("");
            setHora("");
            setSku("");
            setDescripcion("");
            setStockSistema("");
            setStockFisico("");
            setPrecioUnitario("");
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>
            <div className="contenedor">
                <Form onSubmit={onSubmitForm}>
                    <Row className="align-items-center">
                        <Form.Group as={Col} className="mb-3" controlId="formIdInventario">
                            <Form.Label>ID Inventario</Form.Label>
                            <Form.Control type="number" placeholder="1" required={true}
                                value={idInventario}
                                onChange={e => setIdInventario(e.target.value)}
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
                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Registrar;
