import React, { useState } from 'react'
import { Button, Modal } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa'

const EditarProducto = ({ producto, getProductos }) => {

    const [descripcion, setDescripcion] = useState(producto.descripcion);
    const [precioUnitario, setPrecioUnitario] = useState(producto.preciounitario);
    const [stockSistema, setStockSistema] = useState(producto.stocksistema);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateProducto = async (e) => {
        e.preventDefault();
        try {
            const body = { descripcion, precioUnitario, stockSistema };
            await fetch(`http://localhost:5000/productos/${producto.sku}`,
                {
                    method: "PUT",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            handleClose();
            getProductos();
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <>
            <Button type="button"
                variant="primary"
                data-target={`#sku${producto.sku}`}
                onClick={handleShow}
            ><FaIcons.FaEdit className="h-100 w-100" /></Button>

            <Modal className="Modal"
                show={show}
                onHide={handleClose}
                backdrope="static"
                keyboard={false}
                id={`sku${producto.sku}`}
                onClick={() =>
                    setDescripcion(producto.descripcion) &&
                    setPrecioUnitario(producto.precioUnitario) &&
                    setStockSistema(producto.stockSistema)
                }
            >

                <Modal.Header closeButton>
                    <Modal.Title>Editar Producto</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="mb-2">
                        <label className="mb-1">Descripcion</label>
                        <input type="text"
                            className="form-control"
                            value={descripcion}
                            onChange={e => setDescripcion(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label className="mb-1">Precio Unitario</label>
                        <input type="text"
                            className="form-control"
                            value={precioUnitario}
                            onChange={e => setPrecioUnitario(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label className="mb-1">Stock del Sistema</label>
                        <input type="text"
                            className="form-control"
                            value={stockSistema}
                            onChange={e => setStockSistema(e.target.value)}
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
                        onClick={e => updateProducto(e)}
                    >
                        Editar
                    </Button>
                </Modal.Footer>

            </Modal>

        </>
    )
}

export default EditarProducto