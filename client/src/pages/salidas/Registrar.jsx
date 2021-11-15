import React, { useState } from "react";
import { Form, Button, Row, Col, InputGroup} from "react-bootstrap";
import SelectProductos from "../../components/consultas/SelectProductos";
import SelectClientes from "../../components/consultas/SelectClientes";

const Salidas = () => {

    const [folio, setFolio] = useState("");
    const [sku, setSku] = useState("");
    const [idCliente, setIdCliente] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [precioPublico, setPrecioPublico] = useState("");
    const [descuento, setDescuento] = useState("");


    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { folio, sku, idCliente, fecha, hora, cantidad, precioPublico, descuento };
            const response = await fetch("http://localhost:5000/salidas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(response);
            setFolio("");
            setSku("");
            setIdCliente("");
            setFecha("");
            setHora("");
            setCantidad("");
            setPrecioPublico("");
            setDescuento("");
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>
            <div className="contenedor">
                <Form onSubmit={onSubmitForm}>
                    <Row className="align-items-center">
                        <Form.Group as={Col} className="mb-3" controlId="formFolio">
                            <Form.Label>Folio</Form.Label>
                            <Form.Control type="text" placeholder="S001"
                                value={folio}
                                onChange={e => setFolio(e.target.value)}
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
                            <Form.Control type="number" placeholder="1"
                                value={cantidad}
                                onChange={e => setCantidad(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formPrecioPublico">
                            <Form.Label>Precio Publico</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control type="number" placeholder="0.01"
                                    value={precioPublico}
                                    onChange={e => setPrecioPublico(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formDescuento">
                            <Form.Label>Descuento</Form.Label>
                            <InputGroup>
                                <Form.Control type="number" placeholder="0.01"
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
                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Salidas;
