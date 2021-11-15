import React, { useState, useEffect } from 'react'
import { Table, Button } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';

const RevisarYBuscar = () => {
    
    const [proveedores, setProveedores] = useState([]);

    const getProveedores = async () => {
        try {
            const response = await fetch("http://localhost:5000/proveedores");
            const jsonData = await response.json();
            setProveedores(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const borrarProveedor = async idproveedor => {
        try {
            await fetch(`http://localhost:5000/proveedores/${idproveedor}`, {
                method: "DELETE"
            });
            setProveedores(proveedores.filter(proveedores => proveedores.idproveedor !== idproveedor));
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getProveedores();
    }, [])

    console.log(proveedores);

    return (
        <>
        <Button onClick={getProveedores}>Refrescar</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Razon Social</th>
                        <th>RFC</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                        <th>Direccion</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedores.map(proveedor => (
                        <tr key={proveedor.idproveedor}>
                            <td>{proveedor.idproveedor}</td>
                            <td>{proveedor.razonsocial}</td>
                            <td>{proveedor.rfc}</td>
                            <td>{proveedor.telefono}</td>
                            <td>{proveedor.correo}</td>
                            <td>{proveedor.direccion}</td>
                            <td><Button className="btn btn-primary"><FaIcons.FaEdit className="h-100 w-100" /></Button></td>
                            <td><Button className="btn btn-danger" onClick={() => borrarProveedor(proveedor.idproveedor)}><FaIcons.FaTrashAlt className="h-100 w-100" /></Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default RevisarYBuscar
