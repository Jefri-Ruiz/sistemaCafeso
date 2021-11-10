import React, { useState } from 'react'
import { Button, Modal } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa'

const EditarUsuario = ({usuario}) => {
    const [nombre, setNombre] = useState(usuario.nombre);

    /* Para mostar la ventana modal */

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    /* prueba actualizar usuario */

    const updateNombre = async (e) =>{
        e.preventDefault();
        try {
            const body = {nombre};
            /* const respuesta =  */await fetch(`http://localhost:5000/usuarios/${usuario.matricula}`,
            {
                method: "PUT",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(body)
            }
            );
            window.location = "/usuarios";
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <>
            <Button type="button"
                variant="primary"
                data-target={`#matricula${usuario.matricula}`}
                onClick={handleShow}
            ><FaIcons.FaEdit className="h-100 w-100"/></Button>

            <Modal className="Modal"
                show={show} 
                onHide={handleClose}
                backdrope="static"
                keyboard={false}
                id={`matricula${usuario.matricula}`}
                onClick={()=> setNombre(usuario.nombre)}
            >

                        <Modal.Header closeButton>
                            <Modal.Title>Editar usuario</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <input type="text"
                                className="form-control"
                                value={nombre}
                                onChange={e => setNombre(e.target.value) }
                            />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button
                                type="button"
                                variant="secondary" 
                                /* onClick={() => setNombre(usuario.nombre)} */
                                onClick={() => handleClose()}
                            >
                            Cerrar
                            </Button>
                            <Button
                                type="button"
                                variant="primary" 
                                onClick={e => updateNombre(e)}
                            >
                            Editar
                            </Button>
                        </Modal.Footer>

            </Modal>
            
        </>
    )
}

export default EditarUsuario
