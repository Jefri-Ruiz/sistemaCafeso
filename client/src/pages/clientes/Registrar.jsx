import React, { useState, useEffect } from 'react'
import { Table, Tabs, Tab, Form, Button, Row, Col } from "react-bootstrap";

const Clientes = () => {

    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [rfc, setRfc] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { telefono, correo, nombre, apellidoPaterno, apellidoMaterno, rfc };
            const respuesta = await fetch("http://localhost:5000/clientes", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(body);
            console.log(respuesta);

            setTelefono("");
            setCorreo("");
            setNombre("");
            setApellidoPaterno("");
            setApellidoPaterno("");
            setRfc("");
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <div className="contenedor">
                <Form onSubmit={onSubmitForm}>

                    <Form.Group className="mb-4" controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            autoComplete="off"
                            type="text"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </Form.Group>

                    <Row className="align-items-center">
                        <Form.Group as={Col} className="mb-4" controlId="formApellidoPaterno">
                            <Form.Label>Apellido Paterno</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                placeholder="Apellido Paterno"
                                value={apellidoPaterno}
                                onChange={e => setApellidoPaterno(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-4" controlId="formApellidoMaterno">
                            <Form.Label>Apellido Materno</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                placeholder="Apellido Materno"
                                value={apellidoMaterno}
                                onChange={e => setApellidoMaterno(e.target.value)}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="align-items-center">
                        <Form.Group as={Col} className="mb-4" controlId="formRfc">
                            <Form.Label>RFC</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                placeholder="RFC"
                                value={rfc}
                                onChange={e => setRfc(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-4" controlId="formTelefono">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                placeholder="Telefono"
                                value={telefono}
                                onChange={e => setTelefono(e.target.value)}
                            />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-4" controlId="formCorreo">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control
                            autoComplete="off"
                            type="text"
                            placeholder="nombre@ejemplo.com"
                            value={correo}
                            onChange={e => setCorreo(e.target.value)}
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

export default Clientes