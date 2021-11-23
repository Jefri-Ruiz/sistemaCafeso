import React, {useState} from "react";
import { Tabs, Tab } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";

import RevisarYBuscar from "./RevisarYBuscar";
import RegistrarUsuarios from "./RegistrarUsuarios";

import "./usuarios.scss";

const Usuarios = () => {
  const [key, setKey] = useState("Registrar");

  return (
    <>
      <div className="usuarios">
        <div className="container">
          <div className="usuarios__titulo">
            <h2>Usuarios</h2>
            <Breadcrumb>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Usuarios</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-2 w-100"
            style={{ textDecoration: "none" }}
          >
            <Tab eventKey="Registrar" title="Registrar">
              <RegistrarUsuarios />
            </Tab>

            <Tab eventKey="Revisar y buscar" title="Revisar y buscar">
              <RevisarYBuscar key={key}/>
            </Tab>

          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Usuarios;
