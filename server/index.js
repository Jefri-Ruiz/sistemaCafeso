const express = require('express');
const app = express();
const cors = require('cors');


const rutaUsuarios = require("./routes/rutaUsuarios");
const rutaEntradas = require("./routes/rutaEntradas");
const rutaSalidas = require("./routes/rutaSalidas");
const rutaInventario = require("./routes/rutaInventario");;
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



