import React, { useState } from 'react'
import { Button, Modal } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa'

const EditarProveedor = ({ proveedor, getProveedores }) => {

    const [razonSocial, setRazonSocial] = useState(proveedor.razonsocial);
    const [rfc, setRfc] = useState(proveedor.rfc);
    const [telefono, setTelefono] = useState(proveedor.telefono);
    const [correo, setCorreo] = useState(proveedor.correo);
    const [direccion, setDireccion] = useState(proveedor.direccion);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateProveedor = async (e) => {
        e.preventDefault();
        try {
            const body = { razonSocial, rfc, telefono, correo, direccion };
            await fetch(`http://localhost:5000/proveedores/${proveedor.idproveedor}`,
                {
                    method: "PUT",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            handleClose();
            getProveedores();
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <>
            <Button type="button"
                variant="primary"
                data-target={`#idProveedor${proveedor.idProveedor}`}
                onClick={handleShow}
            ><FaIcons.FaEdit className="h-100 w-100" /></Button>

            <Modal className="Modal"
                show={show}
                onHide={handleClose}
                backdrope="static"
                keyboard={false}
                id={`idProveedor${proveedor.idProveedor}`}
                onClick={() =>
                    setRazonSocial(proveedor.razonsocial) &&
                    setRfc(proveedor.rfc) &&
                    setTelefono(proveedor.telefono) &&
                    setCorreo(proveedor.correo) &&
                    setDireccion(proveedor.direccion)
                }
            >

                <Modal.Header closeButton>
                    <Modal.Title>Editar Proveedor</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="mb-2">
                        <label className="mb-1">Razon Social</label>
                        <input type="text"
                            className="form-control"
                            value={razonSocial}
                            onChange={e => setRazonSocial(e.target.value)}
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

                    <div className="mb-2">
                        <label className="mb-1">Direccion</label>
                        <input type="text"
                            className="form-control"
                            value={direccion}
                            onChange={e => setDireccion(e.target.value)}
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
                        onClick={e => updateProveedor(e)}
                    >
                        Editar
                    </Button>
                </Modal.Footer>

            </Modal>

        </>
    )
}

export default EditarProveedor

