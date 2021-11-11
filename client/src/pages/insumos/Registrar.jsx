import React, { useState } from 'react'
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";

const Insumos = () => {

    const [sku, setSku] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [costoUnitario, setCostoUnitario] = useState('');
    const [unidadMedida, setUnidadMedida] = useState('');
    const [stockSistema, setStockSistema] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { sku, descripcion,costoUnitario, unidadMedida, stockSistema };
            const respuesta = await fetch("http://localhost:5000/insumos", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(body);
            console.log(respuesta);

            setSku("");
            setDescripcion("");
            setCostoUnitario("");
            setUnidadMedida("");
            setStockSistema("");
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <div className="contenedor">
                <Form onSubmit={onSubmitForm}>

                    <Form.Group className="mb-4" controlId="formSku">
                        <Form.Label>SKU</Form.Label>
                        <Form.Control
                            autoComplete="off"
                            type="text"
                            placeholder="Codigo del insumo"
                            value={sku}
                            onChange={e => setSku(e.target.value)}
                        />
                    </Form.Group>

                    <Row className="align-items-center">
                        
                        <Form.Group as={Col} xs={5} className="mb-4" controlId="formUnidadMedida">
                            <Form.Label>Unidad de Medida</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                placeholder="Kilogramos, Piezas..."
                                value={unidadMedida}
                                onChange={e => setUnidadMedida(e.target.value)}
                            />
                        </Form.Group>
                        
                        <Form.Group as={Col} className="mb-4" controlId="formCostoUnitario">
                            <Form.Label>Costo por unidad</Form.Label>
                            <InputGroup className="mb-0">    
                            <InputGroup.Text>$</InputGroup.Text>        
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                placeholder="0"
                                value={costoUnitario}
                                onChange={e => setCostoUnitario(e.target.value)}
                            />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-4" controlId="formStockSistema">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                placeholder="0"
                                value={stockSistema}
                                onChange={e => setStockSistema(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-4" controlId="formValorAlmacen">
                            <Form.Label>Valor del Almacen</Form.Label>
                            <InputGroup className="mb-0">    
                            <InputGroup.Text>$</InputGroup.Text> 
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                placeholder="0"
                                value={costoUnitario * stockSistema}
                                onChange={() => { return costoUnitario * stockSistema }}
                            />
                            </InputGroup>
                        </Form.Group>
                        
                    </Row>

                    <Form.Group className="mb-3" controlId="formDescripcion">
                        <Form.Label>Descripcion del insumo</Form.Label>
                        <Form.Control
                            autoComplete="off"
                            as="textarea"
                            type="text"
                            placeholder="Bolsas de Plastico para..."
                            rows={3}
                            value={descripcion}
                            onChange={e => setDescripcion(e.target.value)}
                        />
                    </Form.Group>

                    <br />

                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Insumos
