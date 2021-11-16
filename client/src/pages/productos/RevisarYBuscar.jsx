import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import EditarProducto from './EditarProducto';
import * as FaIcons from 'react-icons/fa'

const RevisarYBuscar = () => {

    const [productos, setProductos] = useState([]);

    const getProductos = async () => {
        try {
            const response = await fetch("http://localhost:5000/productos");
            const jsonData = await response.json();
            setProductos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const borrarProducto = async sku => {
        try {
            await fetch(`http://localhost:5000/productos/${sku}`, {
                method: "DELETE"
            });
            setProductos(productos.filter(productos => productos.sku !== sku));
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getProductos();
    }, [])

    console.log(productos);

    return (
        <>
            <Button onClick={getProductos}>Refrescar</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th>Descripcion</th>
                        <th>Precio Unitario</th>
                        <th>IVA</th>
                        <th>Precio Publico</th>
                        <th>Stock Sistema</th>
                        <th>Valor Almacen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.sku}>
                            <td>{producto.sku}</td>
                            <td>{producto.descripcion}</td>
                            <td>${producto.preciounitario}</td>
                            <td>{producto.iva}%</td>
                            <td>${producto.preciopublico}</td>
                            <td>{producto.stocksistema}</td>
                            <td>${producto.valoralmacen}</td>

                            <td className="d-flex justify-content-around align-items-center">
                                <EditarProducto producto={producto} getProductos={getProductos} />
                                <Button
                                    className="btn btn-danger"
                                    onClick={() => borrarProducto(producto.sku)}
                                >
                                    <FaIcons.FaTrashAlt className="h-100 w-100" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default RevisarYBuscar;