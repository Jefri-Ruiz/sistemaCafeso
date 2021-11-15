import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

import './inventario.scss'

import Registrar from "./Registrar";
import RevisarYBuscar from "./RevisarYBuscar";

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

export default Inventario;
