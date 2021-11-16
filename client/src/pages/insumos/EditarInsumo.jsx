import React, { useState } from 'react'
import { Button, Modal } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa'

const EditarInsumo = ({ insumo, getInsumos }) => {

    const [descripcion, setDescripcion] = useState(insumo.descripcion);
    const [costoUnitario, setCostoUnitario] = useState(insumo.costounitario);
    const [unidadMedida, setUnidadMedida] = useState(insumo.unidadmedida);
    const [stockSistema, setStockSistema] = useState(insumo.stocksistema);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateInsumo = async (e) => {
        e.preventDefault();
        try {
            const body = { descripcion, costoUnitario, unidadMedida,stockSistema };
            await fetch(`http://localhost:5000/insumos/${insumo.sku}`,
                {
                    method: "PUT",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            handleClose();
            getInsumos();
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <>
            <Button type="button"
                variant="primary"
                data-target={`#sku${insumo.sku}`}
                onClick={handleShow}
            ><FaIcons.FaEdit className="h-100 w-100" /></Button>

            <Modal className="Modal"
                show={show}
                onHide={handleClose}
                backdrope="static"
                keyboard={false}
                id={`sku${insumo.sku}`}
                onClick={() =>
                    setDescripcion(insumo.descripcion) &&
                    setCostoUnitario(insumo.costoUnitario) &&
                    setUnidadMedida(insumo.unidadMedida) &&
                    setStockSistema(insumo.stockSistema)
                }
            >

                <Modal.Header closeButton>
                    <Modal.Title>Editar Insumo</Modal.Title>
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
                        <label className="mb-1">Costo Unitario</label>
                        <input type="text"
                            className="form-control"
                            value={costoUnitario}
                            onChange={e => setCostoUnitario(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label className="mb-1">Unidad de Medida</label>
                        <input type="text"
                            className="form-control"
                            value={unidadMedida}
                            onChange={e => setUnidadMedida(e.target.value)}
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
                        onClick={e => updateInsumo(e)}
                    >
                        Editar
                    </Button>
                </Modal.Footer>

            </Modal>

        </>
    )
}

export default EditarInsumo