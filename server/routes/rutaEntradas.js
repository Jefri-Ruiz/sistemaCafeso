const router = require("express").Router();
const pool = require('../db.js');


//Muestra todas las entradas
router.get("/", async(req, res) => {
    try {
        const todoEntrada = await pool.query("SELECT * FROM Entrada");
        res.json(todoEntrada.rows);
    } catch (err) {
        console.error(err.message);
    }
});


//Crear nuevo folio
router.post("/", async(req, res) =>{
    try {
        const {folio, sku, idProveedor, fecha, hora, cantidad, costoUnitario} = req.body;
        const newEntrada = await pool.query("insert into Entrada (folio, sku, idProveedor, fecha, hora, cantidad, costoUnitario) values ($1, $2, $3, $4, $5, $6, $7) RETURNING folio, sku, idProveedor, fecha, hora, cantidad, costoUnitario",[folio, sku, idProveedor, fecha, hora, cantidad, costoUnitario] );
        res.json(newEntrada.rows[0]);
        
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/:proveedor", async(req, res) => {
    try {
        const proveedor = await pool.query("SELECT idproveedor, razonsocial FROM proveedor");
        res.json(proveedor.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/:producto", async(req, res) => {
    try {
        const producto = await pool.query("SELECT sku, descripcion FROM producto");
        res.json(producto.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;