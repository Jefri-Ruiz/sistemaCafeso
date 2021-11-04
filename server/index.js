const express = require('express');
const app = express();
const cors = require('cors');


const rutaUsuarios = require("./routes/rutaUsuarios");

//middleware

app.use(cors());
app.use(express.json());


//Rutas

app.listen(5000, () => {
    console.log('server listo en el puerto 5000');
});



app.use("/usuarios", rutaUsuarios);





