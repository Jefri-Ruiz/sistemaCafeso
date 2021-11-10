import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';

const RevisarYBuscar = () => {

    const [salidas, setSalidas] = useState([]);

    const getSalidas = async () => {
        try {
            const response = await fetch("http://localhost:5000/salidas");
            const jsonData = await response.json();
            setSalidas(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getSalidas();
    }, [])

    console.log(salidas);

    return (
        <>
        <Button onClick={getSalidas}>Refrescar</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Folio</th>
                        <th>SKU</th>
                        <th>ID Cliente</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Cantidad</th>
                        <th>Precio Publico</th>
                        <th>Descuento</th>
                        <th>Monto Total</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {salidas.map(salida => (
                        <tr key={salida.folio}>
                            <td>{salida.folio}</td>
                            <td>{salida.sku}</td>
                            <td>{salida.idcliente}</td>
                            <td>{salida.fecha}</td>
                            <td>{salida.hora}</td>
                            <td>{salida.cantidad}</td>
                            <td>$ {salida.preciopublico}</td>
                            <td>{salida.descuento} %</td>
                            <td>$ {salida.montototal}</td>
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