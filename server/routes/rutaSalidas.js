const router = require("express").Router();
const pool = require('../db.js');


//Muestra todas las salidas
router.get("/", async(req, res) => {
    try {
        const salida = await pool.query("SELECT * FROM salida");
        res.json(salida.rows);
    } catch (err) {
        console.error(err.message);
    }
});


//Crear nuevo folio
router.post("/", async(req, res) =>{
    try {
        const {folio, sku, idCliente, fecha, hora, cantidad, precioPublico, descuento} = req.body;
        const salida = await pool.query("insert into salida (folio, sku, idCliente, fecha, hora, cantidad, precioPublico, descuento) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING folio, sku, idCliente, fecha, hora, cantidad, precioPublico, descuento",[folio, sku, idCliente, fecha, hora, cantidad, precioPublico, descuento] );
        res.json(salida.rows[0]);
        
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;