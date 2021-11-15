const express = require('express');
const app = express();
const cors = require('cors');


const rutaUsuarios = require("./routes/rutaUsuarios");
const rutaEntradas = require("./routes/rutaEntradas");
const rutaSalidas = require("./routes/rutaSalidas");
const rutaInventario = require("./routes/rutaInventario");;
const rutaProveedores = require("./routes/rutaProveedores");
// const rutaInsumos = require("./routes/rutaInsumos");
const rutaClientes = require("./routes/rutaClientes");
const rutaProductos = require("./routes/rutaProductos");

//middleware

app.use(cors());
app.use(express.json());


//Rutas

app.listen(5000, () => {
    console.log('server listo en el puerto 5000');
});



app.use("/usuarios", rutaUsuarios);
app.use("/entradas", rutaEntradas);
app.use("/salidas", rutaSalidas);
app.use("/inventario", rutaInventario);
app.use("/proveedores", rutaProveedores);
app.use("/clientes", rutaClientes);
app.use("/productos", rutaProductos);
// app.use("/insumos", rutaInsumos);




