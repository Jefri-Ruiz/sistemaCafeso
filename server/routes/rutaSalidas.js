const router = require("express").Router();
const pool = require('../db.js');


//Muestra todas las salidas
router.get("/", async(req, res) => {
    try {
        const salida = await pool.query("SELECT folio, sku, idCliente, TO_CHAR(fecha, 'YYYY-MM-DD') AS fecha, hora, cantidad, precioPublico, descuento, montoTotal FROM salida ORDER BY folio ASC");
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

//UPDATE a salida
router.put("/:folio", async (req, res) => {
    try {
        const {folio} = req.params;
        const {sku, idCliente, fecha, hora, cantidad, precioPublico, descuento } = req.body;
        const salidaUpdate = await pool.query("UPDATE salida SET sku = $1, idCliente = $2, fecha = $3, hora = $4, cantidad = $5, precioPublico = $6, descuento = $7 WHERE folio = $8", [sku, idCliente, fecha, hora, cantidad, precioPublico, descuento, folio.toLocaleUpperCase()]);
        res.json("Fue actualizado!");
    } catch (err) {
        console.error(err.message);
    }
});

//DELETE a salida
router.delete("/:folio", async(req, res) => {
    try {
        const {folio} = req.params;
        const salidaDelete = await pool.query("DELETE FROM salida WHERE folio = $1 ", [folio.toLocaleUpperCase()]);
        res.json("Fue eliminado correctamente!");
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;