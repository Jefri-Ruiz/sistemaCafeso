import React, { useState, useEffect } from "react";
import { Table, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import EditarCliente from "./EditarCliente";
import * as FaIcons from "react-icons/fa";
import { CSVLink } from "react-csv";
import DocumentPdf from "./reportPdf/DocumentPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

const RevisarYBuscar = () => {
  const [clientes, setClientes] = useState([]);
  const [buscar, setBuscar] = useState("");

  const getClientes = async () => {
    try {
      const response = await fetch("http://localhost:5000/clientes");
      const jsonData = await response.json();
      setClientes(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const borrarCliente = async (idcliente) => {
    try {
      await fetch(`http://localhost:5000/clientes/${idcliente}`, {
        method: "DELETE",
      });
      setClientes(
        clientes.filter((clientes) => clientes.idcliente !== idcliente)
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getClientes();
  }, []);

  const filtroClientes = clientes.filter((cliente) =>
    cliente.nombre.toUpperCase().includes(buscar.toUpperCase())
  );

  console.log(clientes);

  return (
    <>
    <div className="clientes__nav">
      <Form>
        <Row className="align-items-center">
          <Col className="mb-3">
            <Form.Group
              as={Col}
              xs={11}
              className="mb-0"
              controlId="formBuscar"
            >
              <InputGroup className="mb-0">
                <InputGroup.Text>Buscar por:</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Nombre de la persona"
                  onChange={(e) => setBuscar(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
          </Col>

          <Col className="mb-3">
            <Button
              variant="primary"
              style={{ marginRight: 20 }}
              onClick={getClientes}
            >
              <FaIcons.FaSync className="h-100 w-100" />
            </Button>

            <PDFDownloadLink
              document={<DocumentPdf clientes={filtroClientes} />}
              filename="clientes.pdf"
            >
              <Button variant="secondary" style={{ marginRight: 20 }}>
                PDF <FaIcons.FaDownload className="h-150 w-150" />
              </Button>
            </PDFDownloadLink>

            <CSVLink data={filtroClientes} filename={"clientes.csv"}>
              <Button variant="secondary">
                CSV <FaIcons.FaDownload className="h-150 w-150" />
              </Button>
            </CSVLink>
          </Col>
        </Row>
      </Form>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>RFC</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtroClientes.map((cliente) => (
            <tr key={cliente.idcliente}>
              <td>{cliente.idcliente}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellidopaterno}</td>
              <td>{cliente.apellidomaterno}</td>
              <td>{cliente.rfc}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.correo}</td>

              <td className="d-flex justify-content-around align-items-center">
                <EditarCliente cliente={cliente} getClientes={getClientes} />
                <Button
                  className="btn btn-danger"
                  onClick={() => borrarCliente(cliente.idcliente)}
                >
                  <FaIcons.FaTrashAlt className="h-100 w-100" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default RevisarYBuscar;
