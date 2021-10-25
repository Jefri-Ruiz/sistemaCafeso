import React from 'react'
import { Table } from "react-bootstrap";

import './productos.scss'

const Productos = () => {
    return (
        <>
        <div className="productos">
          <div className="container titulo">
            <h2>Productos</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Numero Poliza</th>
                  <th>Paquete</th>
                  <th>Inicio Vigencia</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Marco Cortez</td>
                  <td>784512</td>
                  <td>Autos</td>
                  <td>12/5/20</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob Perez</td>
                  <td>326589</td>
                  <td>Pickup</td>
                  <td>12/6/20</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Kate Ruiz</td>
                  <td>785612</td>
                  <td>Protegela</td>
                  <td>15/8/20</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </>
    )
}

export default Productos
