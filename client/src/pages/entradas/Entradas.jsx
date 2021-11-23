import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import './entradas.scss'
import RevisarYBuscar from "./RevisarYBuscar";
import Registrar from "./Registrar";

const Entradas = () => {

  const [key, setKey] = useState('Registrar');
  
  return (
    <>
      <div className="entradas">
        <div className="container">
          <div className="entradas__titulo">
            <h2>Entradas</h2>
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
            {console.log(key)}
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default Entradas;
