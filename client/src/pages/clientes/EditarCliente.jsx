import React, { useState } from 'react'
import { Button, Modal } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa'

const EditarCliente = ({ cliente, getClientes }) => {

    const [telefono, setTelefono] = useState(cliente.telefono);
    const [correo, setCorreo] = useState(cliente.correo);
    const [nombre, setNombre] = useState(cliente.nombre);
    const [apellidoPaterno, setApellidoPaterno] = useState(cliente.apellidopaterno);
    const [apellidoMaterno, setApellidoMaterno] = useState(cliente.apellidomaterno);
    const [rfc, setRfc] = useState(cliente.rfc);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateCliente = async (e) => {
        e.preventDefault();
        try {
            const body = { telefono, correo, nombre, apellidoPaterno, apellidoMaterno, rfc };
            await fetch(`http://localhost:5000/clientes/${cliente.idcliente}`,
                {
                    method: "PUT",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            handleClose();
            getClientes();
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <>
            <Button type="button"
                variant="primary"
                data-target={`#idCliente${cliente.idCliente}`}
                onClick={handleShow}
            ><FaIcons.FaEdit className="h-100 w-100" /></Button>

            <Modal className="Modal"
                show={show}
                onHide={handleClose}
                backdrope="static"
                keyboard={false}
                id={`idCliente${cliente.idCliente}`}
                onClick={() =>
                    setTelefono(cliente.telefono) &&
                    setCorreo(cliente.correo) &&
                    setNombre(cliente.nombre) &&
                    setApellidoPaterno(cliente.apellidoPaterno) &&
                    setApellidoMaterno(cliente.apellidoMaterno) &&
                    setRfc(cliente.rfc)
                }
            >

                <Modal.Header closeButton>
                    <Modal.Title>Editar Cliente</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="mb-2">
                        <label className="mb-1">Nombre(s)</label>
                        <input type="text"
                            className="form-control"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label className="mb-1">Apellido Paterno</label>
                        <input type="text"
                            className="form-control"
                            value={apellidoPaterno}
                            onChange={e => setApellidoPaterno(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label className="mb-1">Apellido Materno</label>
                        <input type="text"
                            className="form-control"
                            value={apellidoMaterno}
                            onChange={e => setApellidoMaterno(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label className="mb-1">RFC</label>
                        <input type="text"
                            className="form-control"
                            value={rfc}
                            onChange={e => setRfc(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label className="mb-1">Telefono</label>
                        <input type="text"
                            className="form-control"
                            value={telefono}
                            onChange={e => setTelefono(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label className="mb-1">Correo</label>
                        <input type="text"
                            className="form-control"
                            value={correo}
                            onChange={e => setCorreo(e.target.value)}
                        />
                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => handleClose()}
                    >
                        Cerrar
                    </Button>
                    <Button
                        type="button"
                        variant="primary"
                        onClick={e => updateCliente(e)}
                    >
                        Editar
                    </Button>
                </Modal.Footer>

            </Modal>

        </>
    )
}

export default EditarCliente