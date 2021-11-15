import React, { useState, useEffect } from 'react'
import { Table, Button } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';

const RevisarYBuscar = () => {
    
    const [insumos, setInsumos] = useState([]);

    const getInsumos = async () => {
        try {
            const response = await fetch("http://localhost:5000/insumos");
            const jsonData = await response.json();
            setInsumos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const borrarInsumos = async sku => {
        try {
            await fetch(`http://localhost:5000/insumos/${sku}`, {
                method: "DELETE"
            });
            setInsumos(insumos.filter(insumos => insumos.sku !== sku));
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getInsumos();
    }, [])

    console.log(insumos);

    return (
        <>
        <Button onClick={getInsumos}>Refrescar</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th>Descripcion</th>
                        <th>Costo Unitario</th>
                        <th>Unidad de medida</th>
                        <th>Stock en Sistema</th>
                        <th>Valor del Almacen</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {insumos.map(insumo => (
                        <tr key={insumo.sku}>
                            <td>{insumo.sku}</td>
                            <td>{insumo.descripcion}</td>
                            <td>${insumo.costounitario}</td>
                            <td>{insumo.unidadmedida}</td>
                            <td>{insumo.stocksistema}</td>
                            <td>${insumo.valoralmacen}</td>
                            <td><Button className="btn btn-primary"><FaIcons.FaEdit className="h-100 w-100" /></Button></td>
                            <td><Button className="btn btn-danger" onClick={() => borrarInsumos(insumo.sku)}><FaIcons.FaTrashAlt className="h-100 w-100" /></Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default RevisarYBuscar
