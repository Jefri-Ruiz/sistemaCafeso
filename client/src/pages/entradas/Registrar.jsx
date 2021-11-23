import React, { useState } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import SelectProductos from "../../components/consultas/SelectProductos";
import SelectProveedor from "../../components/consultas/SelectProveedor";

const Entradas = () => {

    const [folio, setFolio] = useState("");
    const [sku, setSku] = useState("");
    const [idProveedor, setIdProveedor] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [costoUnitario, setCostoUnitario] = useState("");


    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { folio, sku, idProveedor, fecha, hora, cantidad, costoUnitario };
            const response = await fetch("http://localhost:5000/entradas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)

            });

            console.log(response);
            console.log(body);
            setFolio("");
            setSku("");
            setIdProveedor("");
            setFecha("");
            setHora("");
            setCantidad("");
            setCostoUnitario("");

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
                            <Form.Control type="text"
                                placeholder="E001"
                                pattern="^E[0-9]{3}$"
                                value={folio}
                                onChange={e => setFolio(e.target.value)}
                                required={true}
                            />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="formNumSku">
                            <Form.Label>SKU</Form.Label>
                            <Form.Select aria-label="Default select example"
                                value={sku}
                                onChange={e => { setSku(e.target.value) }}
                                required={true}
                            >
                                <option value="">Abrir para seleccionar</option>
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
                        <Form.Select aria-label="Default select example"
                            value={idProveedor}
                            onChange={e => { setIdProveedor(e.target.value) }}
                            required={true}
                        >
                            <option value="">Abrir para seleccionar</option>
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
                                required={true}
                            />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formHora">
                            <Form.Label>Hora</Form.Label>
                            <Form.Control type="time"
                                value={hora}
                                onChange={e => setHora(e.target.value)}
                                required={true}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="align-items-center">
                        <Form.Group as={Col} className="mb-3" controlId="formCantidad">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control type="number" placeholder="0"
                                value={cantidad}
                                onChange={e => setCantidad(e.target.value)}
                                required={true}
                                min="0" 
                            />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formCostoUnitario">
                            <Form.Label>Costo unitario</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control type="number" placeholder="0.00"
                                    value={costoUnitario}
                                    onChange={e => setCostoUnitario(e.target.value)}
                                    required={true}
                                    min="0" step="any"
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
                                    min="0" step="any"
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

export default Entradas;
