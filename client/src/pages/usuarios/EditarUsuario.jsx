import React, { useState } from 'react'
import { Button, Modal } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa'

const EditarUsuario = ({usuario, getUsuarios}) => {

    /* UseState lo utilizamos para obtener dato de la bd ejem nombre y despues capturar lo que se ingresa al input con por ejemplo setNombre, tambien podriamos utilizar useref pero es mas practico */
    const [nombre, setNombre] = useState(usuario.nombre);
    const [apellidopaterno, setApellidopaterno] = useState(usuario.apellidopaterno);
    const [apellidomaterno, setApellidomaterno] = useState(usuario.apellidomaterno);
    const [password, setPassword] = useState(usuario.password);

    /* Prueba para ver si se podia realizar lo de arriba con un solo un useState 
    const [dato, setDato] = useState([
        usuario.nombre,
        usuario.password,
        usuario.apellidopaterno,
        usuario.apellidomaterno
    ]);

    const handleInputChange = (event) => {
    // console.log(event.target.name)
    // console.log(event.target.value) 
    setDato({
        ...dato,
        [event.target.name] : event.target.value
    })
    } */

    /* Para mostar la ventana modal */

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    /* prueba actualizar usuario */

    const updateUsuario = async (e) =>{
        e.preventDefault();
        try {
            const body = {nombre, apellidopaterno, apellidomaterno, password};
            /* const respuesta =  */await fetch(`http://localhost:5000/usuarios/${usuario.matricula}`,
            {
                method: "PUT",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(body)
            }
            );
            /* window.location = "/usuarios"; */
            handleClose();
            getUsuarios();
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
                backdrop="static"
                keyboard={false}
                id={`matricula${usuario.matricula}`}
                onClick={()=> setNombre(usuario.nombre) && 
                    setApellidopaterno(usuario.apellidopaterno) && 
                    setApellidomaterno(usuario.apellidomaterno) &&
                    setPassword(usuario.password)
                }
                /* [
                    usuario.nombre,
                    usuario.password,
                    usuario.apellidopaterno,
                    usuario.apellidomaterno
                ] */
            >

                        <Modal.Header closeButton>
                            <Modal.Title>Editar usuario</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div className="mb-2">
                                <label className="mb-1">Nombre</label>
                                <input type="text"
                                    className="form-control"
                                    value={nombre}
                                    onChange={ e => setNombre(e.target.value) }
                                />
                            </div>

                            <div className="mb-2">
                                <label className="mb-1">Apellido paterno</label>
                                <input type="text"
                                    className="form-control"
                                    value={apellidopaterno}
                                    onChange={ e => setApellidopaterno(e.target.value) }
                                    />
                            </div>

                            <div className="mb-2">
                                <label className="mb-1">Apellido materno</label>
                                <input type="text"
                                    className="form-control"
                                    value={apellidomaterno}
                                    onChange={ e => setApellidomaterno(e.target.value) }
                                />
                            </div>

                            <div className="mb-2">
                                <label className="mb-1">Password</label>
                                <input type="text"
                                    className="form-control"
                                    value={password}
                                    onChange={ e => setPassword(e.target.value) }
                                />
                            </div>
                            
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
                                onClick={e => updateUsuario(e)}
                            >
                            Editar
                            </Button>
                        </Modal.Footer>

            </Modal>
            
        </>
    )
}

export default EditarUsuario
