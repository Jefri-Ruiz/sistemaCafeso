import React, { useState } from 'react'
import { Button } from "react-bootstrap";

const EditarUsuario = ({usuario, nombre}) => {
    const [editUsuario, setEditUsuario] = useState(usuario.nombre)

    const updateNombre = async (e) =>{
        e.preventDefault();
        try {
            const body = {nombre};
            const respuesta = await fetch(`http://localhost:5000/usuarios/${usuario.matricula}`,
            {
                method: "PUT",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(body)
            }
            );
            window.location = "/";
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <>
            <Button type="button"
                className="btn btn-warning"
                data-toggle="modal"
                data-target={`#matricula${usuario.matricula}`}
            >Editar</Button>
            <div className="Modal"
                id={`id${usuario.matricula}`}
                onClick={()=> setEditUsuario(usuario.nombre)}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Editar usuario</h4>
                            <Button type="button"
                            className="btn btn-warning"
                            data-dismiss="modal"
                            onClick ={() => setEditUsuario(usuario.nombre)}
                            >&times;</Button>
                        </div>

                        <div className="modal-body">
                            <input type="text"
                                className="form-control"
                                value={nombre}
                                onChange={e => setEditUsuario(e.target.value) }
                            />
                        </div>

                        <div className="modal-footer">
                            <Button type="button"
                                className="btn btn-warning"
                                data-dismiss="modal"
                                onClick={e => updateNombre(e)}
                            >
                            Editar
                            </Button>
                            <Button type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={e => updateNombre(usuario.nombre)}
                            >
                            Cerrar
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
            
        </>
    )
}

export default EditarUsuario
