import React, { useState } from 'react'
import { Form, Button, Row, Col } from "react-bootstrap";

const Proveedores = () => {

    const [razonSocial, setRazonSocial] = useState('');
    const [rfc, setRfc] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { razonSocial, rfc, telefono, correo, direccion };
            const respuesta = await fetch("http://localhost:5000/proveedores", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(body);
            console.log(respuesta);

            setRazonSocial("");
            setRfc("");
            setTelefono("");
            setCorreo("");
            setDireccion("");
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <div className="contenedor">
                <Form onSubmit={onSubmitForm}>

                    <Form.Group className="mb-4" controlId="formRazonSocial">
                        <Form.Label>Razon Social</Form.Label>
                        <Form.Control
                            autoComplete="off"
                            type="text"
                            placeholder="Ejemplo S.A. de C.V."
                            value={razonSocial}
                            onChange={e => setRazonSocial(e.target.value)}
                            required={true}
                        />
                    </Form.Group>

                    <Row className="align-items-center">
                        <Form.Group as={Col} className="mb-4" controlId="formRfc">
                            <Form.Label>RFC</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                placeholder="3JEMPL0"
                                value={rfc}
                                onChange={e => setRfc(e.target.value)}
                                pattern="^[A-Z]{2,3}{3}[0-9]{6}[A-Z0-9]{3}+$"
                                required={true}
                            />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-4" controlId="formTelefono">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                placeholder="123456789"
                                value={telefono}
                                onChange={e => setTelefono(e.target.value)}
                                pattern="[0-9]{10}$"
                                required={true}
                            />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-4" controlId="formCorreo">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                placeholder="nombre@ejemplo.com"
                                value={correo}
                                onChange={e => setCorreo(e.target.value)}
                                pattern="^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$"
                                required={true}
                            />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formDireccion">
                        <Form.Label>Direccion</Form.Label>
                        <Form.Control
                            autoComplete="off"
                            as="textarea"
                            type="text"
                            placeholder="Locación"
                            rows={3}
                            value={direccion}
                            onChange={e => setDireccion(e.target.value)}
                            required={true}
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

export default Proveedores
