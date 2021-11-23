import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

import './salidas.scss'
import RevisarYBuscar from "./RevisarYBuscar";
import Registrar from "./Registrar";

const Salidas = () => {

  const [key, setKey] = useState('Registrar');

  return (
    <>
      <div className="salidas">
        <div className="container">
          <div className="salidas__titulo">
            <h2>Salidas</h2>
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
              <RevisarYBuscar key={key}/>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default Salidas;
