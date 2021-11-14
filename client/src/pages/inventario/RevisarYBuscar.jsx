import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';

const RevisarYBuscar = () => {

    const [inventario, setInventario] = useState([]);

    const getInventario = async () => {
        try {
            const response = await fetch("http://localhost:5000/inventario");
            const jsonData = await response.json();
            setInventario(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getInventario();
    }, [])

    console.log(inventario);

    return (
        <>
        <Button onClick={getInventario}>Refrescar</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID Inventario</th>                        
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>SKU</th>
                        <th>Descripcion</th>
                        <th>Stock sistema</th>
                        <th>Stock fisico</th>
                        <th>Precio unitario</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {inventario.map(inventario => (
                        <tr key={inventario.idinventario}>
                            <td>{inventario.idinventario}</td>
                            <td>{inventario.fecha}</td>
                            <td>{inventario.hora}</td>
                            <td>{inventario.sku}</td>
                            <td>{inventario.descripcion}</td>
                            <td>{inventario.stocksistema}</td>
                            <td>{inventario.stockfisico}</td>
                            <td>$ {inventario.preciounitario}</td>
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