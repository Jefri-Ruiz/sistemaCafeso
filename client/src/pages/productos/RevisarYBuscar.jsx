import React, { useState, useEffect } from "react";
import { Table, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import EditarProducto from "./EditarProducto";
import * as FaIcons from "react-icons/fa";
import { CSVLink } from "react-csv";
import DocumentPdf from "./reportPdf/DocumentPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

const RevisarYBuscar = () => {
  const [productos, setProductos] = useState([]);
  const [buscar, setBuscar] = useState("");

  const getProductos = async () => {
    try {
      const response = await fetch("http://localhost:5000/productos");
      const jsonData = await response.json();
      setProductos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const borrarProducto = async (sku) => {
    try {
      await fetch(`http://localhost:5000/productos/${sku}`, {
        method: "DELETE",
      });
      setProductos(productos.filter((productos) => productos.sku !== sku));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  const filtroProductos = productos.filter((producto) =>
    producto.descripcion.toUpperCase().includes(buscar.toUpperCase())
  );

  console.log(productos);

  return (
    <>
      <div className="productos__nav">
        <Form>
          <Row className="align-items-center">
            <Col className="mb-3">
              <Form.Group controlId="formBuscar">
                <InputGroup className="mb-0">
                  <InputGroup.Text>Buscar por:</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Descripcion del producto"
                    onChange={(e) => setBuscar(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col className="mb-3">
              <Button
                variant="primary"
                style={{ marginRight: 20 }}
                onClick={getProductos}
              >
                <FaIcons.FaSync className="h-100 w-100" />
              </Button>

              <PDFDownloadLink
                document={<DocumentPdf productos={filtroProductos} />}
                filename="Productos.pdf"
              >
                <Button variant="secondary" style={{ marginRight: 20 }}>
                  PDF <FaIcons.FaDownload className="h-150 w-150" />
                </Button>
              </PDFDownloadLink>

              <CSVLink data={filtroProductos} filename={"Productos.csv"}>
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
            <th>SKU</th>
            <th>Descripcion</th>
            <th>Precio Unitario</th>
            <th>IVA</th>
            <th>Precio Publico</th>
            <th>Stock Sistema</th>
            <th>Valor Almacen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtroProductos.map((producto) => (
            <tr key={producto.sku}>
              <td>{producto.sku}</td>
              <td>{producto.descripcion}</td>
              <td>$ {producto.preciounitario}</td>
              <td>{producto.iva} %</td>
              <td>$ {producto.preciopublico}</td>
              <td>{producto.stocksistema}</td>
              <td>$ {producto.valoralmacen}</td>

              <td className="d-flex justify-content-around align-items-center">
                <EditarProducto
                  producto={producto}
                  getProductos={getProductos}
                />
                <Button
                  className="btn btn-danger"
                  onClick={() => borrarProducto(producto.sku)}
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
