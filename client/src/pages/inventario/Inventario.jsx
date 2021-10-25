import React, { useState } from "react";
import { Table, Tabs, Tab, Form, Button } from "react-bootstrap";

import './inventario.scss'

const Inventario = () => {

    const [key, setKey] = useState('Registrar');
    
  return (
    <>
      <div className="inventario">
        <div className="container">
          <div className="inventario__titulo">
            <h2>Inventario</h2>
          </div>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-2 w-100"
            style={{textDecoration:"none"}}
          >
            <Tab eventKey="Registrar" title="Registrar">

            <div className="contenedor">
            <Form>
                
                    <Form.Group className="mb-3" controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Nombre completo" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formNumReporte">
                        <Form.Label>No de reporte</Form.Label>
                        <Form.Control type="number" placeholder="No de reporte" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="fromAsunto">
                        <Form.Label>Asunto</Form.Label>
                        <Form.Control
                              as="textarea"
                              placeholder="Detallar información"
                              style={{ height: '100px' }}                        
                        />
                        
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="fromUrgencia">
                    <Form.Label>Importancia</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Abrir para seleccionar</option>
                        <option value="1">Alta</option>
                        <option value="2">Media</option>
                        <option value="3">Baja</option>
                    </Form.Select>
                    </Form.Group>
                    
                    <Form.Text className="text-muted">
                        La información aqui capturada es de caracter confidencial.
                        </Form.Text>
                        <br />
                        <br />
                    <Button variant="primary" type="submit">
                        Enviar
                    </Button>
                </Form>
                </div>

            </Tab>

            <Tab eventKey="Revisar y buscar" title="Revisar y buscar">

            <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Numero reporte</th>
                    <th>Asunto</th>
                    <th>Importancia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Marco Cortez</td>
                    <td>784512</td>
                    <td>Transporte</td>
                    <td>Media</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob Perez</td>
                    <td>326589</td>
                    <td>Activos</td>
                    <td>Alta</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Kate Ruiz</td>
                    <td>785612</td>
                    <td>Productos</td>
                    <td>Baja</td>
                  </tr>
                </tbody>
              </Table>

            </Tab>

          </Tabs>
        </div>
      </div>
    </>
    )
}

export default Inventario
