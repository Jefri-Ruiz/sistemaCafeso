import React, { useState } from 'react'
import { Tabs, Tab } from "react-bootstrap";
import RevisarYBuscar from "./RevisarYBuscar";
import Registrar from "./Registrar";
import "./clientes.scss";

const Clientes = () => {

  const [key, setKey] = useState('Registrar');

  return (
    <>
      <div className="clientes">
        <div className="container">
          <div className="clientes__titulo">
            <h2>Clientes</h2>
          </div>

          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-2 w-100"
            style={{ textDecoration: "none" }}
          >

            <Tab eventKey="Registrar" title="Registrar">
              <Registrar />
            </Tab>

            <Tab eventKey="Revisar y buscar" title="Revisar y buscar">
              <RevisarYBuscar />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default Clientes