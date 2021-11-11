const express = require('express');
const app = express();
const cors = require('cors');


const rutaUsuarios = require("./routes/rutaUsuarios");
const rutaEntradas = require("./routes/rutaEntradas");
const rutaSalidas = require("./routes/rutaSalidas");
const rutaProveedores = require("./routes/rutaProveedores");
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
app.use("/proveedores", rutaProveedores);
app.use("/clientes", rutaClientes);
app.use("/productos", rutaProductos);



