import React from "react";
import { Button } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";

import ListarUsuarios from "./ListarUsuarios";
import RegistrarUsuarios from "./RegistrarUsuarios";

import "./usuarios.scss";

const Usuarios = () => {
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

          <div className="usuarios__nav d-flex justify-content-end">
            <Button variant="outline-primary" onClick={() => alert('Hola madafaka')}>Visualizar usuarios</Button>
          </div>
          
          <RegistrarUsuarios />
          <ListarUsuarios />
        </div>
      </div>
    </>
  );
};

export default Usuarios;
