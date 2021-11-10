import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';

const RevisarYBuscar = () => {

    const [entradas, setEntradas] = useState([]);

    const getEntradas = async () => {
        try {
            const response = await fetch("http://localhost:5000/entradas");
            const jsonData = await response.json();
            setEntradas(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getEntradas();
    }, [])

    console.log(entradas);

    return (
        <>
        <Button onClick={getEntradas}>Refrescar</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Folio</th>
                        <th>SKU</th>
                        <th>ID Proveedor</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Cantidad</th>
                        <th>Costo Unitario</th>
                        <th>Costo Total</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {entradas.map(entrada => (
                        <tr key={entrada.folio}>
                            <td>{entrada.folio}</td>
                            <td>{entrada.sku}</td>
                            <td>{entrada.idproveedor}</td>
                            <td>{entrada.fecha}</td>
                            <td>{entrada.hora}</td>
                            <td>{entrada.cantidad}</td>
                            <td>$ {entrada.costounitario}</td>
                            <td>$ {entrada.costototal}</td>
                            <td><Button className="btn btn-primary"><FaIcons.FaEdit className="h-100 w-100" /></Button>{/* <EditarUsuario usuario={usuario}/> */}</td>
                            <td><Button className="btn btn-danger" /* onClick={borrarUsuario(usuario.matricula)} */><FaIcons.FaTrashAlt className="h-100 w-100" /></Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default RevisarYBuscar;